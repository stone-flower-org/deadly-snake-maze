import {
  AbstractControllerCollection,
  CameraController,
  IThreejsApp,
  RendererController,
  ScreenController,
} from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';

export interface DSMControllerOptions {
  app: DSMApp;
}

export class DSMController extends AbstractControllerCollection {
  constructor({ app }: DSMControllerOptions) {
    super({
      controllers: [
        new CameraController({ app: app as IThreejsApp }),
        new RendererController({ app: app as IThreejsApp }),
        new ScreenController({ app: app as IThreejsApp }),
      ],
    });
  }
}
