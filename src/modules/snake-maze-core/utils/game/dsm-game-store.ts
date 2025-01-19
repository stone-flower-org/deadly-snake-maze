import { Store } from '@stone-flower-org/js-utils';

import { IParticipant } from '@/src/modules/snake-maze-core/utils/participant';
import { ISpace } from '@/src/modules/snake-maze-core/utils/space';

export enum DSMGameStatus {
  pending = 'pending',
  pause = 'pause',
  run = 'run',
  finished = 'finished',
  canceled = 'canceled',
}

export interface DSMGameState {
  participants: Record<IParticipant['id'], IParticipant>;
  spaces: Record<ISpace['id'], ISpace>;
  status: DSMGameStatus;
  winners: IParticipant['id'][];
}

export const initialDSMState: DSMGameState = {
  participants: {},
  spaces: {},
  status: DSMGameStatus.pending,
  winners: [],
};

export class DSMGameStore extends Store<DSMGameState> {}
