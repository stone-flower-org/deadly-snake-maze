import { type ICommandManager } from '@stone-flower-org/js-utils';

import { DSMInitGameCommand, DSMJoinCommand, DSMJoinCommandResult } from '@/src/modules/snake-maze-core/utils/commands';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

// DSMClientInitCommand
export class DSMClientInitCommand extends AbstractCommand<undefined> {}

// DSMClientClearCommand
export class DSMClientClearCommand extends AbstractCommand<undefined> {}

// DSMClienDebugOnCommand
export class DSMClienDebugOnCommand extends AbstractCommand<undefined> {}

// DSMClienDebugOffCommand
export class DSMClienDebugOffCommand extends AbstractCommand<undefined> {}

export class DSMGameClientExecutor extends AbstractExecutor {
  async execDSMClientInitCommand(_: DSMClientInitCommand) {
    const simulation = this._app.getService('simulation');
    const cmd = simulation.getGameClient().getCommandManager();

    await cmd.exec(DSMInitGameCommand.name, DSMInitGameCommand.create({ mazeCells: 9 }));

    const { id } = await cmd.exec<DSMJoinCommandResult>(DSMJoinCommand.name, DSMJoinCommand.create(undefined));

    simulation.getStore().setPlayerId(id);
    simulation.getStore().syncFromPlayerState();
  }

  async execDSMClientClearCommand(_: DSMClientInitCommand) {
    // TODO: write me
  }

  async execDSMClientDebugOnCommand(_: DSMClienDebugOnCommand) {
    this._app.getService('simulation').getStore().setDebugView();
  }

  async execDSMClientDebugOffCommand(_: DSMClienDebugOffCommand) {
    this._app.getService('simulation').getStore().syncFromPlayerState();
  }

  register(cmd: ICommandManager) {
    this._registerCommand(cmd, DSMClientInitCommand, this.execDSMClientInitCommand.bind(this));
    this._registerCommand(cmd, DSMClientClearCommand, this.execDSMClientClearCommand.bind(this));
    this._registerCommand(cmd, DSMClienDebugOnCommand, this.execDSMClientDebugOnCommand.bind(this));
    this._registerCommand(cmd, DSMClienDebugOffCommand, this.execDSMClientDebugOffCommand.bind(this));
  }
}
