import { type ICommandManager, type IPriorityEventBus, type ITick } from '@stone-flower-org/js-utils';

import { IDSMGame } from '@/src/modules/deadly-maze-core/utils/game';
import { DSMGameStore } from '@/src/modules/deadly-maze-core/utils/store';

export interface IDSMGameClient {
  boot(): Promise<void>;
  update(tick: ITick): void;
  getEventBus(): IPriorityEventBus;
  getCommandManager(): ICommandManager;
  getStore(): DSMGameStore;
  delete(): void;
}

export interface IDSMGameClientOptions {
  game: IDSMGame;
}

export class LocalDSMGameClient implements IDSMGameClient {
  protected _game: IDSMGame;

  constructor({ game }: IDSMGameClientOptions) {
    this._game = game;
  }

  async boot() {
    await this._game.boot();
  }

  update(tick: ITick) {
    this._game.update(tick);
  }

  getEventBus() {
    return this._game.getEventBus();
  }

  getCommandManager() {
    return this._game.getCommandManager();
  }

  getStore() {
    return this._game.getStore();
  }

  delete() {
    this._game.delete();
  }
}
