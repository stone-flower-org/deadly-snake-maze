import * as RAPIER from '@dimforge/rapier3d';
import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { IBody } from './body';

export abstract class AbstractBody<B extends RAPIER.Collider> implements IBody<B> {
  readonly id: number;

  protected static _generateId = createAutoincrementIdGenerator();

  constructor() {
    this.id = this._generateId();
  }

  async init() {
    //
  }

  abstract getBody(): B;

  delete() {
    //
  }

  protected _generateId(): number {
    return AbstractBody._generateId();
  }
}
