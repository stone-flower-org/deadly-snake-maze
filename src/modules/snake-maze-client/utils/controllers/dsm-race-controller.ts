import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';

import { DSMViewController } from './dsm-view-controller';

export interface DSMRaceControllerParams {
  app: DSMApp;
}

export class DSMRaceController extends DSMViewController {
  constructor(options: DSMRaceControllerParams) {
    super(options);
  }
}
