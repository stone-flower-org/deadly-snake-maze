import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';

import { DSMViewController } from './dsm-view-controller';

export interface DSMMazeControllerParams {
  app: DSMApp;
}

export class DSMMazeController extends DSMViewController {
  constructor(params: DSMMazeControllerParams) {
    super(params);
  }
}
