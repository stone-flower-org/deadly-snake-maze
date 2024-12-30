import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface IRendererControllerOptions {
  ctx: IThreejsCtx;
}

export class RendererController extends AbstractController {
  private _ctx: IThreejsCtx;
  private _binder = createContextSaver(this);

  constructor({ ctx }: IRendererControllerOptions) {
    super();
    this._ctx = ctx;
  }

  async init() {
    await super.init();
    this._ctx.store.on(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
    this.onResize();
  }

  onResize() {
    const screen = this._ctx.store.getScreen();
    this._ctx.renderer.getEngine().setSize(screen.width, screen.height);
    this._ctx.renderer.getEngine().setPixelRatio(screen.pixelRatio);
  }

  delete() {
    super.delete();
    this._ctx.store.off(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
  }
}
