import { createContextSaver } from '@stone-flower-org/js-utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { GlobalState, IGlobalState } from '@/src/modules/common/utils/threejs/global-state';
import { Renderer } from '@/src/modules/common/utils/threejs/renderer';

export interface IOrbitalControllerOptions {
  globalState: IGlobalState;
}

export class OrbitalController extends AbstractController {
  private _orbitalControl?: OrbitControls;
  private _globalState: IGlobalState;
  protected _binder = createContextSaver(this);

  constructor({ globalState }: IOrbitalControllerOptions) {
    super();
    this._globalState = globalState;
  }

  async init() {
    await super.init();
    this._globalState.on(GlobalState.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._globalState.renderer.on(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this.onSceneChange();
  }

  onSceneChange() {
    this._orbitalControl?.dispose();

    const camera = this._globalState.scene?.getCamera()?.getView();

    if (!camera) return;

    this._orbitalControl = new OrbitControls(camera, this._globalState.canvas);
    this._orbitalControl.enableDamping = true;
  }

  onTick() {
    this._orbitalControl?.update();
  }

  delete() {
    super.delete();
    this._globalState.off(GlobalState.EVENTS.scenechange, this._binder.useFunc(this.onSceneChange));
    this._globalState.renderer.off(Renderer.EVENTS.beforerender, this._binder.useFunc(this.onTick));
    this._orbitalControl?.dispose();
  }
}
