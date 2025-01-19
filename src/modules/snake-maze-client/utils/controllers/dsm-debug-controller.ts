import { FlyingController, IThreejsApp } from '@/src/modules/common/utils/threejs';
import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';

import { DSMViewController } from './dsm-view-controller';

export interface DSMDebugControllerParams {
  app: DSMApp;
}

export class DSMDebugController extends DSMViewController {
  constructor(params: DSMDebugControllerParams) {
    super(params);
    this.addControllers([new FlyingController({ app: params.app as IThreejsApp })]);
  }
}
