import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface ICameraControllerOptions {
  ctx: IThreejsCtx;
}

export class CameraController extends AbstractController {
  private _ctx: IThreejsCtx;
  protected _binder = createContextSaver(this);

  constructor({ ctx }: ICameraControllerOptions) {
    super();
    this._ctx = ctx;
  }

  async init() {
    await super.init();
    this._ctx.store.on(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
    this.onResize();
  }

  onResize() {
    const camera = this._ctx.store.getScene()?.getCamera();
    if (!camera?.isPerspectiveCamera()) return;
    camera.setParams({ aspect: this._ctx.store.getScreen().aspectRatio });
  }

  delete() {
    super.delete();
    this._ctx.store.off(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
  }
}
