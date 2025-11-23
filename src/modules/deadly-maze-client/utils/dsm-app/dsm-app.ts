import { ThreejsApp } from '@/src/modules/common/utils/threejs';
import { SceneRenderer } from '@/src/modules/deadly-maze-client/utils/scene-renderer';

import { DSMSimulation } from './dsm-simulation';

export interface DSMAppServices {
  simulation: DSMSimulation;
  sceneRenderer: SceneRenderer;
}

export class DSMApp extends ThreejsApp<DSMAppServices> {}
