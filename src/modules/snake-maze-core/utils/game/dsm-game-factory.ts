import { ServiceProvider } from '@stone-flower-org/js-app';
import { CommandManager, PriorityEventBus } from '@stone-flower-org/js-utils';

import { MazeBodyManager, SnakeBodyManager } from '@/src/modules/snake-maze-core/utils/bodies';
import { DSMGameExecutor } from '@/src/modules/snake-maze-core/utils/commands';
import {
  ChickenBotSubscriber,
  DSMGameLogicSubscriber,
  DSMGameSubscriber,
  PhysicSubscriber,
} from '@/src/modules/snake-maze-core/utils/events';
import { PlayerManager } from '@/src/modules/snake-maze-core/utils/participants';
import { RapierPhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { MazeSpaceManager } from '@/src/modules/snake-maze-core/utils/spaces';
import { DSMGameState, DSMGameStore, initialDSMState } from '@/src/modules/snake-maze-core/utils/store';

import { DSMGame } from './dsm-game';

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
      'physicsEngine',
      ServiceProvider.createFromFunc(async () => await RapierPhysicsEngine.create()),
    );
    game.registerProvider(
      'mazeBodyManager',
      ServiceProvider.createFromFunc(() => new MazeBodyManager({ app: game })),
    );
    game.registerProvider(
      'mazeSpaceManager',
      ServiceProvider.createFromFunc(() => new MazeSpaceManager({ app: game })),
    );
    game.registerProvider(
      'playerManager',
      ServiceProvider.createFromFunc(() => new PlayerManager({ app: game })),
    );
    game.registerProvider(
      'snakeBodyManager',
      ServiceProvider.createFromFunc(() => new SnakeBodyManager({ app: game })),
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
    return DSMGameStore.create(
      options.configs?.gameState ?? defaultCreateGameOptions.configs?.gameState,
    ) as DSMGameStore;
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
