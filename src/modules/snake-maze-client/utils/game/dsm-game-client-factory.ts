import { DSMGameFactory } from '@/src/modules/snake-maze-core/utils/game';

export interface DSMGameClientOptions {}

export class DSMGameClientFactory {
  // TODO: write me
  protected _dsmGameFactory: DSMGameFactory;

  static create() {
    return new this();
  }

  constructor() {
    this._dsmGameFactory = DSMGameFactory.create();
  }
}
