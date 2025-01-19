import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface ICameraControllerOptions {
  app: IThreejsApp;
}

export class CameraController extends AbstractController {
  private _app: IThreejsApp;
  protected _binder = createContextSaver(this);

  constructor({ app }: ICameraControllerOptions) {
    super();
    this._app = app;
  }

  async init() {
    await super.init();
    this._app.getService('store').on(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onScreenResize));
    this._app.getService('store').on(ThreejsStore.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this.onScreenResize();
  }

  onScreenResize() {
    const camera = this._app.getService('store').getScene()?.getCamera();
    if (!camera?.isPerspectiveCamera()) return;
    camera.setParams({ aspect: this._app.getService('store').getScreen().aspectRatio });
  }

  onSceneChange() {
    this.onScreenResize();
  }

  delete() {
    super.delete();
    this._app.getService('store').off(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onScreenResize));
    this._app.getService('store').off(ThreejsStore.EVENTS.screenresize, this._binder.useFunc(this.onSceneChange));
  }
}
