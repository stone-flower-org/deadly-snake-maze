import { type Args } from '@stone-flower-org/js-utils';

export class DSMError extends Error {}

export class DSMStoreError extends DSMError {}

export class DSMInvalidEventArgsError extends DSMError {
  protected _args: Args;
  protected _event: string;

  constructor(message: string, event: string, args: Args) {
    super(message);
    this._args = args;
    this._event = event;
  }

  get args() {
    return this._args;
  }

  get event() {
    return this._event;
  }
}

export class DSMInvalidCommandArgsError extends DSMError {
  protected _args: Args;
  protected _command: string;

  constructor(message: string, command: string, args: Args) {
    super(message);
    this._args = args;
    this._command = command;
  }

  get args() {
    return this._args;
  }

  get command() {
    return this._command;
  }
}
