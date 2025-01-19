import { type ICommandManager } from '@stone-flower-org/js-utils';

import { DSMView } from '@/src/modules/snake-maze-client/utils/dsm-app';
import { DSMMazeScene } from '@/src/modules/snake-maze-client/utils/scenes';
import { DSMInitGameCommand, DSMJoinCommand, DSMJoinCommandResult } from '@/src/modules/snake-maze-core/utils/commands';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

// DSMClientInitCommand
export class DSMClientInitCommand extends AbstractCommand<undefined> {}

// DSMClientClearCommand
export class DSMClientClearCommand extends AbstractCommand<undefined> {}

// DSMClientCommand
export class DSMClientNoclipOnCommand extends AbstractCommand<undefined> {}

// DSMClientNoclipOffCommand
export class DSMClientNoclipOffCommand extends AbstractCommand<undefined> {}

export class DSMGameClientExecutor extends AbstractExecutor {
  async execDSMClientInitCommand(_: DSMClientInitCommand) {
    //// Demo Start
    const scene = await DSMMazeScene.create({ app: this._app }); // TODO: delete me
    // TODO: add flying camera controller
    await scene.init();
    this._app.getService('store').setScene(scene);
    this._app.start();
    //// Demo End

    // const simulation = this._app.getService('simulation');
    // const commandManager = simulation.getGameClient().getCommandManager();

    // await commandManager.exec(DSMInitGameCommand.name, DSMInitGameCommand.create(undefined));
    // const { id } = await commandManager.exec<DSMJoinCommandResult>(
    //   DSMJoinCommand.name,
    //   DSMJoinCommand.create(undefined),
    // );
    // simulation.getStore().setState((state) => ({
    //   ...state,
    //   playerId: id,
    // }));
    // await this._app.start();
  }

  async execDSMClientClearCommand(_: DSMClientInitCommand) {
    // TODO: write me
  }

  async execDSMClientNoclipOnCommand(_: DSMClientNoclipOnCommand) {
    this._app
      .getService('simulation')
      .getStore()
      .setState(
        (state) => ({
          ...state,
          view: DSMView.debug,
        }),
        true,
      );
  }

  async execDSMClientNoclipOffCommand(_: DSMClientNoclipOffCommand) {
    this._app
      .getService('simulation')
      .getStore()
      .setState(
        (state) => ({
          ...state,
          view: DSMView.maze, // TODO: write determination of view based of state
        }),
        true,
      );
  }

  register(store: ICommandManager) {
    this._registerCommand(store, DSMClientInitCommand, this.execDSMClientInitCommand.bind(this));
    this._registerCommand(store, DSMClientClearCommand, this.execDSMClientClearCommand.bind(this));
    this._registerCommand(store, DSMClientNoclipOnCommand, this.execDSMClientNoclipOnCommand.bind(this));
    this._registerCommand(store, DSMClientNoclipOffCommand, this.execDSMClientNoclipOffCommand.bind(this));
  }
}
