import { type IValidContainerServices } from '@stone-flower-org/js-app';
import { type ITickingClock } from '@stone-flower-org/js-utils';

import { IRenderer } from '@/src/modules/common/utils/threejs/renderer';
import { ISimulation } from '@/src/modules/common/utils/threejs/simulation';
import { IThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

export interface IThreejsCoreServices {
  clock: ITickingClock;
  renderer: IRenderer;
  window: Window;
  canvas: HTMLElement;
  simulation: ISimulation;
  store: IThreejsStore;
}

export type IThreejsServices<S extends IValidContainerServices> = S & IThreejsCoreServices;
