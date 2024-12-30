import * as RAPIER from '@dimforge/rapier3d';
import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { DEFAULT_GRAVITY } from '@/src/modules/common/utils/rapier/constants';

import { IWorld, IWorldOptions } from './world';

export abstract class AbstractWorld implements IWorld {
  public readonly id: number;
  protected _body: RAPIER.World;

  protected static _generateId = createAutoincrementIdGenerator();

  constructor({ body }: Partial<IWorldOptions> = {}) {
    this.id = this._generateId();
    this._body = body ?? new RAPIER.World(DEFAULT_GRAVITY);
  }

  async init() {
    //
  }

  getBody() {
    return this._body;
  }

  clear() {
    this._body.free();
  }

  delete() {
    this.clear();
  }

  protected _generateId() {
    return AbstractWorld._generateId();
  }
}
