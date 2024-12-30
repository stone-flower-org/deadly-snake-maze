import { type Class, compose, type ICommandManager } from '@stone-flower-org/js-utils';

import { DSMSimulation } from '@/src/modules/snake-maze-client/utils/dsm-simulation';
import { DSMValidation } from '@/src/modules/snake-maze-core/utils/validation';

export interface ISubscriberOptions {
  env: DSMSimulation;
}

export abstract class AbstractExecutor {
  _env: DSMSimulation;

  constructor({ env }: ISubscriberOptions) {
    this._env = env;
  }

  protected _registerCommand<C>(store: ICommandManager, command: Class<C>, executor: (e: C) => unknown) {
    store.register(
      command.name,
      compose(DSMValidation.createCommandArgsValidation(command.name, command)).next(executor).produce(),
    );
  }

  abstract register(store: ICommandManager): void;
}
