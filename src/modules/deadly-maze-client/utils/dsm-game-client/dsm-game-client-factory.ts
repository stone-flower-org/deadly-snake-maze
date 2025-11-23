import { DSMGameClientExecutor } from '@/src/modules/deadly-maze-client/utils/commands';
import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';
import { DSMGameFactory } from '@/src/modules/deadly-maze-core/utils/game';

import { IDSMGameClient, LocalDSMGameClient } from './dsm-game-client';

export interface DSMGameClientOptions {}

export class DSMGameClientFactory {
  protected _dsmGameFactory: DSMGameFactory;

  static create() {
    return new this();
  }

  constructor() {
    this._dsmGameFactory = DSMGameFactory.create();
  }

  createDSMGameClient(app: DSMApp, options: DSMGameClientOptions) {
    const gameClient = this._createLocalDSMGameClient(options);

    this.registerDSMGameClientCommands(app, gameClient, options);

    return gameClient;
  }

  createDSMGameCore(options: DSMGameClientOptions) {
    return this._dsmGameFactory.createDSMGame(options);
  }

  registerDSMGameClientCommands(app: DSMApp, gameClient: IDSMGameClient, _: DSMGameClientOptions) {
    [new DSMGameClientExecutor({ app })].forEach((subscriber) => {
      subscriber.register(gameClient.getCommandManager());
    });
  }

  protected _createLocalDSMGameClient(options: DSMGameClientOptions) {
    return new LocalDSMGameClient({
      game: this.createDSMGameCore(options),
    });
  }
}
