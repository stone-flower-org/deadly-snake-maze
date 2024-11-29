import * as THREE from 'three';

import { WithUniformsMixin } from './uniforms-mixin';

export interface AbstractShaderMaterialOptions
  extends Omit<THREE.ShaderMaterialParameters, 'fragmentShader' | 'vertexShader'> {}

export abstract class AbstractShaderMaterial extends WithUniformsMixin(THREE.ShaderMaterial) {
  constructor(params: AbstractShaderMaterialOptions = {}) {
    super(params);

    const { fragmentShader, vertexShader } = this.getShaders();
    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;
  }

  onBeforeRender(renderer: THREE.WebGLRenderer) {
    const size = new THREE.Vector2();
    renderer.getSize(size);

    this.setUniforms({
      ...this.getUniforms(),
      uPixelRatio: new THREE.Uniform(renderer.getPixelRatio()),
      uSize: new THREE.Uniform(size),
    });
  }

  onBeforeCompile(shader: THREE.WebGLProgramParametersWithUniforms, _: THREE.WebGLRenderer) {
    const { uniforms } = shader;
    for (const attr in this._uniforms) {
      uniforms[attr] = this._uniforms[attr];
    }
    this.setUniforms(uniforms);
  }

  abstract getShaders(): { fragmentShader: string; vertexShader: string };
}
