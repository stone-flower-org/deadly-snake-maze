import { ServiceProvider } from '@stone-flower-org/js-app';
import { CommandManager, PriorityEventBus } from '@stone-flower-org/js-utils';

import { DSMGameExecutor } from '@/src/modules/snake-maze-core/utils/commands';
import {
  ChickenBotSubscriber,
  DSMGameLogicSubscriber,
  DSMGameSubscriber,
  PhysicSubscriber,
} from '@/src/modules/snake-maze-core/utils/events';
import { RapierPhysicEngine } from '@/src/modules/snake-maze-core/utils/physic-engine';

import { DSMGame } from './dsm-game';
import { DSMGameState, DSMGameStore, initialDSMState } from './dsm-game-store';

export interface CreateGameOptions {
  configs?: {
    gameState?: DSMGameState;
  };
}

export const defaultCreateGameOptions = {
  configs: {
    gameState: initialDSMState,
  },
};

export class DSMGameFactory {
  static create() {
    return new this();
  }

  createDSMGameDraft(options: CreateGameOptions = defaultCreateGameOptions) {
    return new DSMGame({
      store: this.createStore(options),
      commandManager: CommandManager.create(),
      priorityEventBus: PriorityEventBus.create(),
    });
  }

  createDSMGame(options: CreateGameOptions = defaultCreateGameOptions) {
    const game = this.createDSMGameDraft(options);
    this.registerServiceProviders(game, options);
    this.registerSubscribers(game, options);
    this.registerCommands(game, options);
    return game;
  }

  protected registerServiceProviders(game: DSMGame, _: CreateGameOptions) {
    game.registerProvider(
      'physicEngine',
      ServiceProvider.createFromFunc(async () => await RapierPhysicEngine.create()),
    );
  }

  protected registerSubscribers(game: DSMGame, options: CreateGameOptions) {
    this.createSubscribers(game, options).forEach((subscriber) => {
      subscriber.subscribe(game.getEventBus());
    });
  }

  protected registerCommands(game: DSMGame, options: CreateGameOptions) {
    this.createCommandExecutors(game, options).forEach((executor) => {
      executor.register(game.getService('commandManager'));
    });
  }

  protected createStore(options: CreateGameOptions) {
    return DSMGameStore.create(options.configs?.gameState ?? defaultCreateGameOptions.configs?.gameState);
  }

  protected createSubscribers(game: DSMGame, _: CreateGameOptions) {
    return [
      new ChickenBotSubscriber({ game }),
      new DSMGameLogicSubscriber({ game }),
      new DSMGameSubscriber({ game }),
      new PhysicSubscriber({ game }),
    ];
  }

  createCommandExecutors(game: DSMGame, _: CreateGameOptions = defaultCreateGameOptions) {
    return [new DSMGameExecutor({ game })];
  }
}
