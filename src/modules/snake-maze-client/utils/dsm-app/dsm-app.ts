import { ThreejsApp } from '@/src/modules/common/utils/threejs';

import { DSMSimulation } from './dsm-simulation';

export interface DSMAppServices {
  simulation: DSMSimulation;
}

export class DSMApp extends ThreejsApp<DSMAppServices> {}
