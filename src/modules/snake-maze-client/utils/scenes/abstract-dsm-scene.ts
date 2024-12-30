import * as THREE from 'three';

import { AbstractScene, Camera, ICamera } from '@/src/modules/common/utils/threejs';
import { DSMEnvironment } from '@/src/modules/snake-maze-client/utils/environments';

export interface IDSMSceneOptions {
  env: DSMEnvironment;
}

export abstract class AbstractDSMScene extends AbstractScene {
  _camera: ICamera<THREE.PerspectiveCamera>;
  _env: DSMEnvironment;

  constructor({ env }: IDSMSceneOptions) {
    super();
    this._camera = Camera.createCamera({
      camera: new THREE.PerspectiveCamera(),
    });
    this._env = env;
  }

  getCamera() {
    return this._camera;
  }

  getEnv() {
    return this._env;
  }
}
