import { ServiceProvider } from '@stone-flower-org/js-app';
import {
  type ICommandManager,
  PriorityEventBus,
  type IPriorityEventBus,
  type ITick,
  CommandManager,
} from '@stone-flower-org/js-utils';

import {
  DSMGameAfterUpdateEvent,
  DSMGameBeforeUpdateEvent,
  DSMGameBootEvent,
  DSMGameDeleteEvent,
  DSMGameUpdateEvent,
} from '@/src/modules/snake-maze-core/utils/events';

import { IDSMGameServices } from './dsm-game-services';
import { DSMGameStore } from './dsm-game-store';
import { AbstractGame, IGame, IGameOptions, IValidGameServices } from './game';

export type ICoreDSMGameServices = {
  priorityEventBus: IPriorityEventBus;
  commandManager: ICommandManager;
};

export type IWithCoreDSMGameServices<S extends IValidGameServices = IValidGameServices> = ICoreDSMGameServices & S;

export interface IDSMGameOptions extends IGameOptions<DSMGameStore> {}

export interface IDSMGame extends IGame<IWithCoreDSMGameServices<IDSMGameServices>, DSMGameStore> {
  getEventBus(): IPriorityEventBus;
  getCommandManager(): ICommandManager;
}

export class DSMGame
  extends AbstractGame<IWithCoreDSMGameServices<IDSMGameServices>, DSMGameStore>
  implements IDSMGame
{
  constructor(options: IDSMGameOptions) {
    super(options);
    this._initProviders();
  }

  async boot() {
    await super.boot();
    this.getEventBus().emit(DSMGameBootEvent.name, new DSMGameBootEvent({ game: this }));
  }

  update(tick: ITick) {
    const eventBus = this.getEventBus();
    eventBus.emit(DSMGameBeforeUpdateEvent.name, new DSMGameBeforeUpdateEvent({ tick, game: this }));
    eventBus.emit(DSMGameUpdateEvent.name, new DSMGameUpdateEvent({ tick, game: this }));
    eventBus.emit(DSMGameAfterUpdateEvent.name, new DSMGameAfterUpdateEvent({ tick, game: this }));
  }

  getEventBus() {
    return this.getService('priorityEventBus');
  }

  getCommandManager(): ICommandManager {
    return this.getService('commandManager');
  }

  delete() {
    const eventBus = this.getEventBus();
    eventBus.emit(DSMGameDeleteEvent.name, new DSMGameDeleteEvent({ game: this }));
    eventBus.removeAllListeners();

    this._store.delete();

    super.delete();
  }

  protected _initProviders() {
    const providers = this._createCoreProviders();
    Object.entries(providers).forEach(([key, provider]) => {
      this.registerProvider(key as keyof typeof providers, provider);
    });
  }

  protected _createCoreProviders() {
    return {
      priorityEventBus: ServiceProvider.createFromFunc(PriorityEventBus.create),
      commandManager: ServiceProvider.createFromFunc(CommandManager.create),
    };
  }
}
