import { DSMGame } from '@/src/modules/snake-maze-core/utils/game';
import { BodyModel, IBodyState } from '@/src/modules/snake-maze-core/utils/store';

export interface IAbstractBodyManagerParams {
  app: DSMGame;
}

export abstract class AbstractBodyManager<E extends BodyModel> {
  protected _app: DSMGame;

  constructor({ app }: IAbstractBodyManagerParams) {
    this._app = app;
  }

  deleteByIds(ids: IBodyState['id'][]) {
    this._app.getStore().removeBodies(ids);
  }

  get(ids: IBodyState['id'][]): E[] {
    return this._app.getStore().getBodies(ids) as E[];
  }

  save(bodies: E[]) {
    this._app.getStore().saveBodies(bodies);
  }
}
