import { Store } from '@stone-flower-org/js-utils';

export interface DSMSimulationState {
  playerId?: number;
}

export class DSMSimulationStore extends Store<DSMSimulationState> {}
