import { Container, type IContainer, type IValidContainerServices } from '@stone-flower-org/js-app';
import { type ITick } from '@stone-flower-org/js-utils';

export type IValidGameServices = IValidContainerServices;

export type IValidGameStore = object;

export type IGameOptions<S extends IValidGameStore = IValidGameStore> = {
  store: S;
};

export interface IGame<
  SER extends IValidGameServices = IValidGameServices,
  ST extends IValidGameStore = IValidGameStore,
> extends IContainer<SER> {
  getStore(): ST;
  update(tick: ITick): void;
  delete(): void;
}

export abstract class AbstractGame<
    SER extends IValidGameServices = IValidGameServices,
    ST extends IValidGameStore = IValidGameStore,
  >
  extends Container<SER>
  implements IGame<SER, ST>
{
  protected _store: ST;

  constructor({ store }: IGameOptions<ST>) {
    super();
    this._store = store;
  }

  getStore() {
    return this._store;
  }

  delete() {
    //
  }

  abstract update(tick: ITick): void;
}
