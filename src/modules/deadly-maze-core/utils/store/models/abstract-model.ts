import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { IModel, IValidModelState } from './model';

export interface IAbstractModelParams<S extends IValidModelState = IValidModelState> {
  state: S;
  isNew?: boolean;
}

export type IModelParams<S extends IValidModelState = IValidModelState> = {
  state: S;
  isNew?: boolean;
};

export class AbstractModel<S extends IValidModelState = IValidModelState> implements IModel<S> {
  protected _state: S;
  protected _isNew: boolean;

  static idGenerator = createAutoincrementIdGenerator();

  constructor({ state, isNew }: IAbstractModelParams<S>) {
    this._state = state;
    this._isNew = isNew ?? true;
  }

  getId() {
    return this._state.id;
  }

  setId(id: number) {
    this._state.id = id;
  }

  isNew(): boolean {
    return this._isNew;
  }

  setIsNew(isNew: boolean) {
    this._isNew = isNew;
  }

  getState() {
    return this._state;
  }
}
