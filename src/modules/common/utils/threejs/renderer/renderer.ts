import { type IEventProducer, type ITick, WithEventProducer } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';

import type { WebGLRendererParameters } from 'three';

export type IRendererEngine = THREE.WebGLRenderer;

export interface IRenderer extends IEventProducer {
  render(tick: ITick): void;
  getEngine(): IRendererEngine;
  delete(): void;
}

export interface IRendererOptions extends WebGLRendererParameters {
  app: IThreejsApp;
}

export class Renderer extends WithEventProducer(Function) implements IRenderer {
  private _app: IThreejsApp;
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

  protected constructor({ app, ...rest }: IRendererOptions) {
    super();
    this._app = app;
    this._engine = new THREE.WebGLRenderer(rest);
  }

  getEngine() {
    return this._engine;
  }

  render(_: ITick) {
    const scene = this._app.getService('store').getScene();
    const view = scene?.getView();
    const camera = this._app.getService('store').getScene()?.getCamera()?.getView();

    if (!view || !camera) {
      this._engine.clear(true, true, true);
      return;
    }

    this._eventBus.emit(Renderer.EVENTS.beforerender, this);

    this._engine.render(view, camera);

    this._eventBus.emit(Renderer.EVENTS.afterrender, this);
  }

  delete() {
    this._engine.dispose();
  }
}
