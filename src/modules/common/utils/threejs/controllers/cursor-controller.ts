import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

export interface ICursorControllerOptions {
  ctx: IThreejsCtx;
}

export class CursorController extends AbstractController {
  private _ctx: IThreejsCtx;
  protected _binder = createContextSaver(this);

  constructor({ ctx }: ICursorControllerOptions) {
    super();
    this._ctx = ctx;
  }

  async init() {
    await super.init();
    this._ctx.canvas.addEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._ctx.canvas.addEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._ctx.canvas.addEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }

  onMouseMove(e: MouseEvent) {
    const screen = this._ctx.store.getScreen();
    this._ctx.store.setCursorPosition({
      x: (e.clientX / screen.width) * 2 - 1,
      y: -(e.clientY / screen.height) * 2 + 1,
    });
  }

  onMouseUp() {
    this._ctx.store.setCursorMousedown(false);
  }

  onMouseDown() {
    this._ctx.store.setCursorMousedown(true);
  }

  delete() {
    super.delete();
    this._ctx.canvas.removeEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._ctx.canvas.removeEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._ctx.canvas.removeEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }
}
