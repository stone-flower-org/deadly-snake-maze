import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface IRendererControllerOptions {
  app: IThreejsApp;
}

export class RendererController extends AbstractController {
  private _app: IThreejsApp;
  private _binder = createContextSaver(this);

  constructor({ app }: IRendererControllerOptions) {
    super();
    this._app = app;
  }

  async init() {
    await super.init();
    this._app.getService('store').on(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
    this.onResize();
  }

  onResize() {
    const screen = this._app.getService('store').getScreen();
    this._app.getService('renderer').getEngine().setSize(screen.width, screen.height);
    this._app.getService('renderer').getEngine().setPixelRatio(screen.pixelRatio);
  }

  delete() {
    super.delete();
    this._app.getService('store').off(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onResize));
  }
}
