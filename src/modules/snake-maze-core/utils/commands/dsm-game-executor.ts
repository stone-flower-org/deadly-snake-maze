import { type ICommandManager } from '@stone-flower-org/js-utils';

import { AbstractCommand } from './abstract-command';
import { AbstractExecutor } from './abstract-executor';

export type DSMCommandNonPayload = undefined;

export type DSMMoveCommandPayload = object; // TODO: write me

// DSMMoveCommand
export class DSMMoveCommand extends AbstractCommand<DSMMoveCommandPayload> {}

// DSMInitGameCommand
export class DSMInitGameCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMInitGameCommand
export class DSMStartGameCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMReadyCommand
export class DSMReadyCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMAddChickenBotCommand
export class DSMAddChickenBotCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMRemoveChickenBotCommand
export class DSMRemoveChickenBotCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMAddPlayerCommand
export class DSMAddPlayerCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMRemovePlayerCommand
export class DSMRemovePlayerCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMCreateMazeSpaceCommand
export class DSMCreateMazeSpaceCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMCreateRaceSpaceCommand
export class DSMCreateRaceSpaceCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMTransitCommand
export class DSMTransitCommand extends AbstractCommand<DSMCommandNonPayload> {}

// DSMJoinCommand
export type DSMJoinCommandResult = {
  id: number;
};

export class DSMJoinCommand extends AbstractCommand<DSMCommandNonPayload> {}

export class DSMGameExecutor extends AbstractExecutor {
  execDSMInitGameCommand(c: DSMInitGameCommand) {
    // TODO: write me
    /*
    create maze
    create race
    add bots
    */
  }

  execDSMReadyCommand(c: DSMReadyCommand) {
    // TODO: write me
    /*
    update readiness of the game for the player
    check all players are ready, start the game
    */
  }

  execDSMStartCommand(c: DSMStartGameCommand) {
    // TODO: write me
    /*
    update status of the game
    */
  }

  execDSMMoveCommand(c: DSMMoveCommand) {
    // TODO: write me
  }

  execDSMJoinCommand(c: DSMJoinCommand) {
    // TODO: write me
    /*
    add player
    return players id
    */
  }

  register(store: ICommandManager) {
    this._registerCommand(store, DSMInitGameCommand, this.execDSMInitGameCommand.bind(this));
    this._registerCommand(store, DSMReadyCommand, this.execDSMReadyCommand.bind(this));
    this._registerCommand(store, DSMStartGameCommand, this.execDSMStartCommand.bind(this));
    this._registerCommand(store, DSMMoveCommand, this.execDSMMoveCommand.bind(this));
    this._registerCommand(store, DSMJoinCommand, this.execDSMJoinCommand.bind(this));
  }
}
