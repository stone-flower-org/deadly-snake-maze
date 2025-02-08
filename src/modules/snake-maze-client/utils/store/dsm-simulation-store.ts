import { Store } from '@stone-flower-org/js-utils';

import { MazeSpace } from '@/src/modules/snake-maze-core/utils/spaces/maze/maze-space';

import { IDSMGameStore } from './dsm-game-store';
import { PlayerModel } from './models';

export enum DSMView {
  maze = 'maze',
  race = 'race',
  debug = 'debug',
}

export interface IDSMSimulationState {
  playerId?: number;
  spaceId?: number;
  view: DSMView;
}

export const initialDSMSimulationState = {
  playerId: undefined,
  spaceId: undefined,
  view: DSMView.debug,
};

export class DSMSimulationStore extends Store<IDSMSimulationState> {
  protected _gameStore: IDSMGameStore;

  constructor(state: IDSMSimulationState, store: IDSMGameStore) {
    super(state);
    this._gameStore = store;
  }

  setPlayerId(playerId?: number) {
    this.setState((state) => {
      state.playerId = playerId;
      return state;
    });
  }

  syncFromPlayerState() {
    this.setSpaceId(this.getPlayer().getSpace().getId());

    if (this.getSpace().getState().type === MazeSpace.name) this._state.view = DSMView.maze;
  }

  getPlayer() {
    const { playerId } = this.getState();
    if (playerId === undefined) throw new Error('Player is not set');

    const [participant] = this._gameStore.getParticipants([playerId]);
    const [body] = this._gameStore.getBodies([participant.getState().bodyId]);
    const [space] = this._gameStore.getSpaces([body.getState().spaceId]);

    return new PlayerModel({
      body,
      data: participant,
      space,
    });
  }

  setSpaceId(spaceId?: number) {
    this.setState((state) => {
      state.spaceId = spaceId;
      return state;
    });
  }

  getSpace() {
    const { spaceId } = this.getState();
    if (!spaceId) throw new Error('Space is not set');

    const [space] = this._gameStore.getSpaces([spaceId]);

    return space;
  }

  setDebugView() {
    this._state.view = DSMView.debug;
  }

  getGameStore() {
    return this._gameStore;
  }

  clear() {
    this.setState(() => initialDSMSimulationState);
  }
}
