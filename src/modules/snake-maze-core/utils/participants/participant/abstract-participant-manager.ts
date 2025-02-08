import { DSMGame } from '@/src/modules/snake-maze-core/utils/game';
import { ParticipantModel, IParticipantState } from '@/src/modules/snake-maze-core/utils/store';

export interface IAbstractParticipanManagerParams {
  app: DSMGame;
}

export abstract class AbstractParticipanManager<E extends ParticipantModel> {
  protected _app: DSMGame;

  constructor({ app }: IAbstractParticipanManagerParams) {
    this._app = app;
  }

  deleteByIds(ids: IParticipantState['id'][]) {
    this._app.getStore().removeParticipants(ids);
  }

  get(ids: IParticipantState['id'][]): E[] {
    return this._app.getStore().getParticipants(ids) as E[];
  }

  save(bodies: E[]) {
    this._app.getStore().saveParticipants(bodies);
  }
}
