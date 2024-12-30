import { type Args, type Class, createSingleArgInstanceValidation } from '@stone-flower-org/js-utils';

import { DSMInvalidCommandArgsError, DSMInvalidEventArgsError } from '@/src/modules/snake-maze-core/utils/errors';

export class DSMValidation {
  static createEventArgsValidation<T = unknown>(event: string, proto: Class<T>) {
    return createSingleArgInstanceValidation(proto, (...args: Args) => {
      throw new DSMInvalidEventArgsError(`Arg must have ${proto.name} instance for ${event} event`, event, args);
    });
  }

  static createCommandArgsValidation<T = unknown>(command: string, proto: Class<T>) {
    return createSingleArgInstanceValidation(proto, (...args: Args) => {
      throw new DSMInvalidCommandArgsError(
        `Arg must have ${proto.name} instance for ${command} command`,
        command,
        args,
      );
    });
  }
}
