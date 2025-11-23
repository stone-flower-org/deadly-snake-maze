import * as THREE from 'three';

import { AbstractShaderMaterial, IAbstractShaderMaterialOptions } from '@/src/modules/common/utils/threejs';
import fragmentShader from '@/src/modules/deadly-maze-client/utils/shaders/unknown/fragment.glsl';
import vertexShader from '@/src/modules/deadly-maze-client/utils/shaders/unknown/vertex.glsl';

export interface IUnknownMaterialOptions extends IAbstractShaderMaterialOptions {
  cellSize?: number;
  color?: THREE.ColorRepresentation;
}

export class UnknownMaterial extends AbstractShaderMaterial {
  constructor({ cellSize = 1, color, ...params }: IUnknownMaterialOptions) {
    super(params);

    this.setUniforms({
      ...this.getUniforms(),
      uCellSize: new THREE.Uniform(cellSize),
      uColor: new THREE.Uniform(new THREE.Color(color)),
    });
  }

  getShaders() {
    return {
      fragmentShader,
      vertexShader,
    };
  }

  get cellSize() {
    return this.getUniform('uCellSize');
  }

  set cellSize(value: Required<IUnknownMaterialOptions['cellSize']>) {
    this.setUniform('uCellSize', value);
  }

  get color() {
    return this.getUniform('uColor');
  }

  set color(value: Required<IUnknownMaterialOptions['color']>) {
    this.setUniform('uColor', value);
  }
}

export const unknownMaterial = new UnknownMaterial({
  color: 0xff00ff,
  cellSize: 1,
});
