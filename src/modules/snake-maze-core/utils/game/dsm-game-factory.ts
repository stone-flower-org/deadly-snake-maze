import { ServiceProvider } from '@stone-flower-org/js-app';

import { DSMGameExecutor } from '@/src/modules/snake-maze-core/utils/commands';
import {
  ChickenBotSubscriber,
  DSMGameLogicSubscriber,
  DSMGameSubscriber,
  PhysicSubscriber,
} from '@/src/modules/snake-maze-core/utils/events';
import { RapierPhysicEngine } from '@/src/modules/snake-maze-core/utils/physic-engine';

import { DSMGame } from './dsm-game';
import { DSMGameStore, initialDSMState } from './dsm-game-store';

export interface CreateGameOptions {}

export class DSMGameFactory {
  static create() {
    return new this();
  }

  createDSMGameDraft(options: CreateGameOptions = {}) {
    return new DSMGame({
      store: this.createStore(options),
    });
  }

  createDSMGame(options: CreateGameOptions = {}) {
    const game = this.createDSMGameDraft(options);
    this.registerServiceProviders(game, options);
    this.registerSubscribers(game, options);
    this.registerCommands(game, options);
    return game;
  }

  registerServiceProviders(game: DSMGame, _: CreateGameOptions = {}) {
    game.registerProvider('physicEngine', ServiceProvider.createFromFunc(RapierPhysicEngine.create));
  }

  registerSubscribers(game: DSMGame, _: CreateGameOptions = {}) {
    this.createSubscribers(game).forEach((subscriber) => {
      subscriber.subscribe(game.getEventBus());
    });
  }

  registerCommands(game: DSMGame, options: CreateGameOptions = {}) {
    this.createCommandExecutors(game, options).forEach((executor) => {
      executor.register(game.getService('commandManager'));
    });
  }

  createStore(_: CreateGameOptions = {}) {
    return DSMGameStore.create(initialDSMState);
  }

  createSubscribers(game: DSMGame, _: CreateGameOptions = {}) {
    return [
      new ChickenBotSubscriber({ game }),
      new DSMGameLogicSubscriber({ game }),
      new DSMGameSubscriber({ game }),
      new PhysicSubscriber({ game }),
    ];
  }

  createCommandExecutors(game: DSMGame, _: CreateGameOptions = {}) {
    return [new DSMGameExecutor({ game })];
  }
}
