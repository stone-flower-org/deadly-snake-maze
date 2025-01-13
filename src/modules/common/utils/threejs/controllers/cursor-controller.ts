import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';

export interface ICursorControllerOptions {
  app: IThreejsApp;
}

export class CursorController extends AbstractController {
  private _app: IThreejsApp;
  protected _binder = createContextSaver(this);

  constructor({ app }: ICursorControllerOptions) {
    super();
    this._app = app;
  }

  async init() {
    await super.init();
    this._app.getService('canvas').addEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._app.getService('canvas').addEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._app.getService('canvas').addEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }

  onMouseMove(e: MouseEvent) {
    const screen = this._app.getService('store').getScreen();
    this._app.getService('store').setCursorPosition({
      x: (e.clientX / screen.width) * 2 - 1,
      y: -(e.clientY / screen.height) * 2 + 1,
    });
  }

  onMouseUp() {
    this._app.getService('store').setCursorMousedown(false);
  }

  onMouseDown() {
    this._app.getService('store').setCursorMousedown(true);
  }

  delete() {
    super.delete();
    this._app.getService('canvas').removeEventListener('mousemove', this._binder.useFunc(this.onMouseMove));
    this._app.getService('canvas').removeEventListener('mouseup', this._binder.useFunc(this.onMouseUp));
    this._app.getService('canvas').removeEventListener('mousedown', this._binder.useFunc(this.onMouseDown));
  }
}
