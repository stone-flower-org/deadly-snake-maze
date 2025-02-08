import { DSMGame } from '@/src/modules/snake-maze-core/utils/game';
import { IBodyState, SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

export interface IAbstractSpaceManagerParams {
  app: DSMGame;
}

export abstract class AbstractSpaceManager<E extends SpaceModel> {
  protected _app: DSMGame;

  constructor({ app }: IAbstractSpaceManagerParams) {
    this._app = app;
  }

  deleteByIds(ids: IBodyState['id'][]) {
    this._app.getStore().removeSpaces(ids);
  }

  get(ids: IBodyState['id'][]): E[] {
    return this._app.getStore().getSpaces(ids) as E[];
  }

  save(bodies: E[]) {
    this._app.getStore().saveSpaces(bodies);
  }
}
