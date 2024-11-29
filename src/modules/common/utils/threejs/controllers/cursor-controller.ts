import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';

export interface ICursorControllerOptions {
  globalState: IGlobalState;
}

export class CursorController extends AbstractController {
  private _globalState: IGlobalState;
  protected _binder = createContextSaver(this);

  constructor({ globalState }: ICursorControllerOptions) {
    super();
    this._globalState = globalState;
  }

  async init() {
    await super.init();
    this._globalState.canvas.addEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._globalState.canvas.addEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._globalState.canvas.addEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }

  onMouseMove(e: MouseEvent) {
    const [width, height] = this._globalState.screen.getSize();
    this._globalState.cursor.setPosition({
      x: (e.clientX / width) * 2 - 1,
      y: -(e.clientY / height) * 2 + 1,
    });
  }

  onMouseUp() {
    this._globalState.cursor.setMousedown(false);
  }

  onMouseDown() {
    this._globalState.cursor.setMousedown(true);
  }

  delete() {
    super.delete();
    this._globalState.canvas.removeEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._globalState.canvas.removeEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._globalState.canvas.removeEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }
}
