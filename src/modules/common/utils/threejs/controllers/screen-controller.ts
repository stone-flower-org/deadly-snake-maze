import { createContextSaver } from '@stone-flower-org/js-utils';
import { debounce } from 'lodash';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

export interface IScreenControllerOptions {
  ctx: IThreejsCtx;
}

export class ScreenController extends AbstractController {
  private _ctx: IThreejsCtx;
  private _binder = createContextSaver(this);
  private _observer: ResizeObserver;

  constructor({ ctx }: IScreenControllerOptions) {
    super();
    this._ctx = ctx;
    this._observer = new ResizeObserver(debounce(this._binder.useFunc(this.onResize), 50));
  }

  async init() {
    await super.init();
    this._ctx.canvas.parentElement && this._observer.observe(this._ctx.canvas.parentElement);
  }

  onResize() {
    const rect = this._ctx.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    this._ctx.store.setScreenSize(rect.width, rect.height);
    this._ctx.store.setScreenPixelRatio(this._ctx.window.devicePixelRatio);
  }

  delete() {
    super.delete();
    this._observer.disconnect();
  }
}
