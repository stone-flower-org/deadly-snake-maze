import { Store } from '@stone-flower-org/js-utils';

export enum DSMView {
  maze = 'maze',
  race = 'race',
  debug = 'debug',
}

export interface IDSMSimulationState {
  playerId?: number;
  view: DSMView;
}

export class DSMSimulationStore extends Store<IDSMSimulationState> {}

export const initialDSMSimulationState: IDSMSimulationState = {
  playerId: undefined,
  view: DSMView.maze,
};
