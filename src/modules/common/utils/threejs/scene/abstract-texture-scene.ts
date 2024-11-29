import * as THREE from 'three';

import { ICamera } from '@/src/modules/common/utils/threejs/camera';
import { IRenderer } from '@/src/modules/common/utils/threejs/renderer';

import { AbstractScene } from './abstract-scene';
import { ITextureScene } from './texture-scene';

export interface IAbstractTextureSceneOptions {
  size?: number;
  renderer: IRenderer;
}

export abstract class AbstractTextureScene extends AbstractScene<ICamera<THREE.CubeCamera>> implements ITextureScene {
  protected _renderTarget: THREE.WebGLCubeRenderTarget;
  protected _renderer: IRenderer;

  constructor({ renderer, size = 512 }: IAbstractTextureSceneOptions) {
    super();
    this._renderer = renderer;
    this._renderTarget = new THREE.WebGLCubeRenderTarget(size, {
      type: THREE.HalfFloatType,
    });
  }

  protected _updateRenderTarget() {
    this.getCamera()?.getView()?.update(this._renderer.getEngine(), this.getView());
  }

  getTexture() {
    return this._renderTarget.texture;
  }
}
