import { type ICommandManager } from '@stone-flower-org/js-utils';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

export type DSMCommandNonPayload = undefined;

export type DSMMoveCommandPayload = object; // TODO: write me

/* DSMInitGameCommand start */
export interface DSMInitGameCommandPayload {
  mazeCells?: number;
}

export class DSMInitGameCommand extends AbstractCommand<DSMInitGameCommandPayload> {}
/* DSMInitGameCommand end */

/* DSMJoinCommand start */
export type DSMJoinCommandResult = {
  id: number;
};

export class DSMJoinCommand extends AbstractCommand<DSMCommandNonPayload> {}
/* DSMJoinCommand end */

/* DSMStartCommand Start */
export interface DSMStartCommandPayload {
  playerId: number;
}

export class DSMStartCommand extends AbstractCommand<DSMStartCommandPayload> {}
/* DSMStartCommand End */

/* DSMReadyCommand Start */
export interface DSMReadyCommandPayload {
  playerId: number;
}

export class DSMReadyCommand extends AbstractCommand<DSMReadyCommandPayload> {}
/* DSMReadyCommand End */

/* DSMMoveCommand start */
export class DSMMoveCommand extends AbstractCommand<DSMMoveCommandPayload> {}
/* DSMMoveCommand end */

/* DSMStopCommand start */
export interface DSMStopCommandPayload {
  playerId: number;
}

export class DSMStopCommand extends AbstractCommand<DSMStopCommandPayload> {}
/* DSMStopCommand end */

/* DSMContinueCommand Start */
export interface DSMContinueCommandPayload {
  playerId: number;
}

export class DSMContinueCommand extends AbstractCommand<DSMContinueCommandPayload> {}
/* DSMContinueCommand End */

export class DSMGameExecutor extends AbstractExecutor {
  execDSMInitGameCommand(c: DSMInitGameCommand) {
    // TODO: write me
    /*
    add bots
    */
    const { mazeCells } = c.payload;

    this._game.getService('mazeSpaceManager').create({ cells: mazeCells });
  }

  execDSMReadyCommand(c: DSMReadyCommand) {
    // TODO: write me
    /*
    update readiness of the game for the player
    check all players are ready, start the game
    */
  }

  execDSMMoveCommand(c: DSMMoveCommand) {
    // TODO: write me
  }

  execDSMJoinCommand(_: DSMJoinCommand): DSMJoinCommandResult {
    const mazeSpace = this._game.getService('mazeSpaceManager').findMazeSpace();
    const mazeBody = this._game.getService('mazeBodyManager').findMazeBody();

    const player = this._game.getService('playerManager').create({
      space: mazeSpace,
    });

    // TODO: think how to spawn player at certain point
    // mazeBody.getHunterSpawn();

    return { id: player.getId() };
  }

  register(cmd: ICommandManager) {
    this._registerCommand(cmd, DSMInitGameCommand, this.execDSMInitGameCommand.bind(this));
    this._registerCommand(cmd, DSMReadyCommand, this.execDSMReadyCommand.bind(this));
    this._registerCommand(cmd, DSMMoveCommand, this.execDSMMoveCommand.bind(this));
    this._registerCommand(cmd, DSMJoinCommand, this.execDSMJoinCommand.bind(this));
  }
}
