import { type Class, compose, type ICommandManager } from '@stone-flower-org/js-utils';

import { IDSMGame } from '@/src/modules/deadly-maze-core/utils/game';
import { DSMValidation } from '@/src/modules/deadly-maze-core/utils/validation';

export interface ISubscriberOptions {
  game: IDSMGame;
}

export abstract class AbstractExecutor {
  _game: IDSMGame;

  constructor({ game }: ISubscriberOptions) {
    this._game = game;
  }

  protected _registerCommand<C>(store: ICommandManager, command: Class<C>, executor: (e: C) => unknown) {
    store.register(
      command.name,
      compose(DSMValidation.createCommandArgsValidation(command.name, command)).next(executor).produce(),
    );
  }

  abstract register(store: ICommandManager): void;
}
