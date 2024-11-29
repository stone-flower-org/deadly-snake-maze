import * as THREE from 'three';

import { ICamera } from '@/src/modules/common/utils/threejs/camera';

import { IScene } from './scene';

export interface ITextureScene extends IScene<ICamera<THREE.CubeCamera>> {
  getTexture(): THREE.Texture;
}
