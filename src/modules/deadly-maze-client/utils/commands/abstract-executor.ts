import { type Class, compose, type ICommandManager } from '@stone-flower-org/js-utils';

import { DSMApp } from '@/src/modules/deadly-maze-client/utils/dsm-app';
import { DSMValidation } from '@/src/modules/deadly-maze-core/utils/validation';

export interface ISubscriberOptions {
  app: DSMApp;
}

export abstract class AbstractExecutor {
  _app: DSMApp;

  constructor({ app }: ISubscriberOptions) {
    this._app = app;
  }

  protected _registerCommand<C>(store: ICommandManager, command: Class<C>, executor: (e: C) => unknown) {
    store.register(
      command.name,
      compose(DSMValidation.createCommandArgsValidation(command.name, command)).next(executor).produce(),
    );
  }

  abstract register(store: ICommandManager): void;
}
