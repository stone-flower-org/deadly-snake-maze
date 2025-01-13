import { createContextSaver } from '@stone-flower-org/js-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { Renderer } from '@/src/modules/common/utils/threejs/renderer';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface IOrbitalControllerOptions {
  app: IThreejsApp;
}

export class OrbitalController extends AbstractController {
  private _orbitalControl?: OrbitControls;
  private _app: IThreejsApp;
  protected _binder = createContextSaver(this);

  constructor({ app }: IOrbitalControllerOptions) {
    super();
    this._app = app;
  }

  async init() {
    await super.init();
    this._app.getService('store').on(ThreejsStore.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._app.getService('renderer').on(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this.onSceneChange();
  }

  onSceneChange() {
    this._orbitalControl?.dispose();

    const camera = this._app.getService('store').getScene()?.getCamera()?.getView();

    if (!camera) return;

    this._orbitalControl = new OrbitControls(camera, this._app.getService('canvas'));
    this._orbitalControl.enableDamping = true;
  }

  onTick() {
    this._orbitalControl?.update();
  }

  delete() {
    super.delete();
    this._app.getService('store').off(ThreejsStore.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._app.getService('renderer').off(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this._orbitalControl?.dispose();
  }
}
