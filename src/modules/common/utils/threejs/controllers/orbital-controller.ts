import { createContextSaver } from '@stone-flower-org/js-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { Renderer } from '@/src/modules/common/utils/threejs/renderer';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';
import { ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface IOrbitalControllerOptions {
  ctx: IThreejsCtx;
}

export class OrbitalController extends AbstractController {
  private _orbitalControl?: OrbitControls;
  private _ctx: IThreejsCtx;
  protected _binder = createContextSaver(this);

  constructor({ ctx }: IOrbitalControllerOptions) {
    super();
    this._ctx = ctx;
  }

  async init() {
    await super.init();
    this._ctx.store.on(ThreejsStore.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._ctx.renderer.on(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this.onSceneChange();
  }

  onSceneChange() {
    this._orbitalControl?.dispose();

    const camera = this._ctx.store.getScene()?.getCamera()?.getView();

    if (!camera) return;

    this._orbitalControl = new OrbitControls(camera, this._ctx.canvas);
    this._orbitalControl.enableDamping = true;
  }

  onTick() {
    this._orbitalControl?.update();
  }

  delete() {
    super.delete();
    this._ctx.store.off(ThreejsStore.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._ctx.renderer.off(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this._orbitalControl?.dispose();
  }
}
