import * as THREE from 'three';

import { AbstractScene, Camera, ICamera } from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';

export interface IDSMSceneOptions {
  app: DSMApp;
}

export abstract class AbstractDSMScene extends AbstractScene {
  _camera: ICamera<THREE.PerspectiveCamera>;
  _app: DSMApp;

  constructor({ app }: IDSMSceneOptions) {
    super();
    this._camera = Camera.createCamera({
      camera: new THREE.PerspectiveCamera(),
    });
    this._app = app;
  }

  getCamera() {
    return this._camera;
  }
}
