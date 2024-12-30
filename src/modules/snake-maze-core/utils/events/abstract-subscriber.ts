import { type Class, compose, type IPriorityEventBus } from '@stone-flower-org/js-utils';

import { IDSMGame } from '@/src/modules/snake-maze-core/utils/game';
import { DSMValidation } from '@/src/modules/snake-maze-core/utils/validation';

import { Priority } from './priorities';

export interface ISubscriberOptions {
  game: IDSMGame;
}

export abstract class AbstractDSMSGameubscriber {
  protected _game: IDSMGame;

  constructor({ game }: ISubscriberOptions) {
    this._game = game;
  }

  protected _subscribeListener<C>(
    eventBus: IPriorityEventBus,
    command: Class<C>,
    listener: (e: C) => unknown,
    priority: Priority,
  ) {
    eventBus.on(
      command.name,
      compose(DSMValidation.createCommandArgsValidation(command.name, command)).next(listener).produce(),
      priority,
    );
  }

  abstract subscribe(eventBus: IPriorityEventBus): void;
}
