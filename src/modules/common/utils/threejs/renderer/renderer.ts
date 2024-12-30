import { type IEventProducer, type ITick, WithEventProducer } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

import type { WebGLRendererParameters } from 'three';

export type IRendererEngine = THREE.WebGLRenderer;

export interface IRenderer extends IEventProducer {
  boot(ctx: IThreejsCtx): Promise<void>;
  render(tick: ITick): void;
  getEngine(): IRendererEngine;
  delete(): void;
}

export interface IRendererOptions extends WebGLRendererParameters {}

export class Renderer extends WithEventProducer(Function) implements IRenderer {
  private _ctx?: IThreejsCtx;
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

  async boot(ctx: IThreejsCtx) {
    this._ctx = ctx;
  }

  getEngine() {
    return this._engine;
  }

  render(_: ITick) {
    this._eventBus.emit(Renderer.EVENTS.beforerender, this);

    const scene = this._ctx?.store.getScene();
    const view = scene?.getView();
    const camera = this._ctx?.store.getScene()?.getCamera()?.getView();

    if (!view || !camera) {
      this._engine.clear(true, true, true);
      return;
    }

    this._engine.render(view, camera);

    this._eventBus.emit(Renderer.EVENTS.afterrender, this);
  }

  delete() {
    this._engine.dispose();
  }
}
