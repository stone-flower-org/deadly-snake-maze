import { type ICommandManager } from '@stone-flower-org/js-utils';

import { DSMMazeScene } from '@/src/modules/snake-maze-client/utils/scenes';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

// DSMClientInitCommand
export class DSMClientInitCommand extends AbstractCommand<undefined> {}

export class DSMGameClientExecutor extends AbstractExecutor {
  async execDSMClientInitCommand(_: DSMClientInitCommand) {
    const scene = await DSMMazeScene.create({ app: this._app }); // TODO: delete me
    await scene.init();
    this._app.getService('store').setScene(scene);

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
