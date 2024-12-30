import {
  AbstractControllerCollection,
  IControllerCollectionOptions,
} from '@/src/modules/common/utils/threejs/controller';
import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

import { CameraController } from './camera-controller';
import { CursorController } from './cursor-controller';
import { RendererController } from './renderer-controller';
import { ScreenController } from './screen-controller';

export interface ICoreControllersCollectionOptions extends IControllerCollectionOptions {
  ctx: IThreejsCtx;
}

export class CoreControllerCollection extends AbstractControllerCollection {
  protected _ctx: IThreejsCtx;

  constructor({ ctx, ...rest }: ICoreControllersCollectionOptions) {
    super({ ...rest });
    this._ctx = ctx;
    this.addControllers(Object.values(this.getCoreControllers()));
  }

  protected getCoreControllers() {
    return {
      cameraController: new CameraController({ ctx: this._ctx }),
      cursorContoller: new CursorController({ ctx: this._ctx }),
      rendererController: new RendererController({ ctx: this._ctx }),
      screenController: new ScreenController({ ctx: this._ctx }),
    };
  }
}
