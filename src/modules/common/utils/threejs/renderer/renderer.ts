import * as THREE from 'three';

import { IEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';

import type { WebGLRendererParameters } from 'three';

export type IRendererEngine = THREE.WebGLRenderer;

export interface IRenderer extends IEventProducer {
  render(state: IGlobalState): void;
  getEngine(): IRendererEngine;
  delete(): void;
}

export interface IRendererOptions extends WebGLRendererParameters {}

export class Renderer extends WithEventProducer(Function) implements IRenderer {
  private _engine: THREE.WebGLRenderer;

  static get EVENTS() {
    return {
      beforerender: 'beforerender',
      afterrender: 'afterrender',
    };
  }

  public static create(options: IRendererOptions) {
    return new this(options);
  }

  protected constructor(options: IRendererOptions) {
    super();
    this._engine = new THREE.WebGLRenderer(options);
  }

  getEngine() {
    return this._engine;
  }

  render(state: IGlobalState) {
    this.emit(Renderer.EVENTS.beforerender, this);

    const view = state.scene?.getView();
    const camera = state.scene?.getCamera()?.getView();

    if (!view || !camera) {
      this._engine.clear(true, true, true);
      return;
    }

    this._engine.render(view, camera);

    this.emit(Renderer.EVENTS.afterrender, this);
  }

  delete() {
    this._engine.dispose();
  }
}
