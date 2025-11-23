import { FlyingController, IThreejsApp } from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';
import { DSMMainScene } from '@/src/modules/deadly-maze-client/utils/scenes';

import { DSMViewController } from './dsm-view-controller';

export interface DSMDebugControllerParams {
  app: DSMApp;
}

export class DSMDebugController extends DSMViewController {
  constructor(params: DSMDebugControllerParams) {
    super(params);
    this.addControllers([new FlyingController({ app: params.app as IThreejsApp })]);
  }

  async init() {
    await super.init();
    this.onSceneInit();
  }

  onSceneInit() {
    const scene = this._app.getService('store').getScene() as DSMMainScene | undefined;

    if (!scene) return;

    scene.getUI().showDebug();
  }

  delete(): void {
    (this._app.getService('store').getScene() as DSMMainScene | undefined)?.getUI()?.showDebug(false);
    super.delete();
  }
}
