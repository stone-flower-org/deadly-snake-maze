import { createContextSaver } from '@stone-flower-org/js-utils';

import { AbstractController } from '@/src/modules/common/utils/threejs/controller';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';
import { Screen } from '@/src/modules/common/utils/threejs/screen';

export interface ICameraControllerOptions {
  globalState: IGlobalState;
}

export class CameraController extends AbstractController {
  private _globalState: IGlobalState;
  protected _binder = createContextSaver(this);

  constructor({ globalState }: ICameraControllerOptions) {
    super();
    this._globalState = globalState;
  }

  async init() {
    await super.init();
    this._globalState.screen.on(Screen.EVENTS.resize, this._binder.useFunc(this.onResize));
    this.onResize();
  }

  onResize() {
    const camera = this._globalState.scene?.getCamera();
    if (!camera?.isPerspectiveCamera()) return;
    camera.setParams({ aspect: this._globalState.screen.getAspectRatio() });
  }

  delete() {
    super.delete();
    this._globalState.screen.off(Screen.EVENTS.resize, this._binder.useFunc(this.onResize));
  }
}
