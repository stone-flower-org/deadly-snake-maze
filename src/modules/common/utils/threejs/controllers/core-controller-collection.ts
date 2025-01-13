import {
  AbstractControllerCollection,
  IControllerCollection,
  IControllerCollectionOptions,
} from '@/src/modules/common/utils/threejs/controller';
import { IThreejsApp } from '@/src/modules/common/utils/threejs/threejs-app';

import { CameraController } from './camera-controller';
import { CursorController } from './cursor-controller';
import { RendererController } from './renderer-controller';
import { ScreenController } from './screen-controller';

export interface ICoreControllersCollectionOptions extends IControllerCollectionOptions {
  app: IThreejsApp;
}

export class CoreControllerCollection extends AbstractControllerCollection implements IControllerCollection {
  protected _app: IThreejsApp;

  constructor({ app, ...rest }: ICoreControllersCollectionOptions) {
    super({ ...rest });
    this._app = app;
    this.addControllers(Object.values(this.getCoreControllers()));
  }

  protected getCoreControllers() {
    return {
      cameraController: new CameraController({ app: this._app }),
      cursorContoller: new CursorController({ app: this._app }),
      rendererController: new RendererController({ app: this._app }),
      screenController: new ScreenController({ app: this._app }),
    };
  }
}
