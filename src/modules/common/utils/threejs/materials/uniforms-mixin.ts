import { isKeyOf } from '@stone-flower-org/js-utils';

import type { Constructor } from '@stone-flower-org/js-utils';
import type { IUniform } from 'three';

export type UniformAttrs = {
  [attr: string]: unknown;
};

export type Uniforms = Record<string, IUniform>;

export type IWithUniforms<U extends UniformAttrs = UniformAttrs, T = object> = {
  setUniform<K extends keyof U>(attr: K, value: U[K]): void;

  getUniform<K extends keyof U>(attr: K): U[K] | undefined;

  getUniforms(): Uniforms;

  setUniforms(uniforms: Uniforms): void;
} & T;

export const WithUniformsMixin = <U extends UniformAttrs, S extends Constructor>(superclass: S) =>
  class extends superclass {
    protected _uniforms: Uniforms = {};

    setUniform<K extends keyof U>(attr: K, value: U[K]) {
      if (!isKeyOf(this._uniforms, attr)) return;
      this._uniforms[attr].value = value;
    }

    getUniform<K extends keyof U>(attr: K) {
      if (!isKeyOf(this._uniforms, attr)) return undefined;
      return this._uniforms[attr].value;
    }

    getUniforms() {
      return this._uniforms;
    }

    setUniforms(uniforms: Uniforms) {
      this._uniforms = uniforms;
    }
  };
