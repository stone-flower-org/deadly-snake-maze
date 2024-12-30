import { type ICommandManager } from '@stone-flower-org/js-utils';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

// DSMClientInitCommand
export class DSMClientInitCommand extends AbstractCommand<undefined> {}

export class DSMGameClientExecutor extends AbstractExecutor {
  execDSMClientInitCommand(c: DSMClientInitCommand) {
    // TODO: write me
    /*
    call init
    call join
    save provided playerId
    */
  }

  register(store: ICommandManager) {
    this._registerCommand(store, DSMClientInitCommand, this.execDSMClientInitCommand.bind(this));
  }
}
