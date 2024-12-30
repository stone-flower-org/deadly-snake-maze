import * as THREE from 'three';

import { AbstractScene, Camera, ICamera } from '@/src/modules/common/utils/threejs';

export class BlankScene extends AbstractScene {
  _camera: ICamera<THREE.PerspectiveCamera>;

  constructor() {
    super();
    this._camera = Camera.createCamera({
      camera: new THREE.PerspectiveCamera(),
    });
  }

  getCamera() {
    return this._camera;
  }
}
