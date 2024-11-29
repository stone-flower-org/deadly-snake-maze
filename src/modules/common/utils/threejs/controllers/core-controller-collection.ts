import {
  AbstractControllerCollection,
  IControllerCollectionOptions,
} from '@/src/modules/common/utils/threejs/controller';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';

import { CameraController } from './camera-controller';
import { CursorController } from './cursor-controller';
import { RendererController } from './renderer-controller';
import { ScreenController } from './screen-controller';

export interface ICoreControllersCollectionOptions extends IControllerCollectionOptions {
  globalState: IGlobalState;
}

export class CoreControllerCollection extends AbstractControllerCollection {
  protected _globalState: IGlobalState;

  constructor({ globalState, ...rest }: ICoreControllersCollectionOptions) {
    super({ ...rest });
    this._globalState = globalState;
    this.addControllers(Object.values(this.getCoreControllers()));
  }

  protected getCoreControllers() {
    return {
      cameraController: new CameraController({ globalState: this._globalState }),
      cursorContoller: new CursorController({ globalState: this._globalState }),
      rendererController: new RendererController({ globalState: this._globalState }),
      screenController: new ScreenController({ globalState: this._globalState }),
    };
  }
}
