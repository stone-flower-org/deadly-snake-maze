import * as DSMClient from '@/src/modules/deadly-maze-client/utils/commands';
import * as DSMCore from '@/src/modules/deadly-maze-core/utils/commands';

export type DSMCommandOption = {
  Class: typeof DSMCore.AbstractCommand | typeof DSMClient.AbstractCommand;
  label: string;
  id: string;
};

const getCommandsFromModules = <M extends object>(modules: M, commandClass: DSMCommandOption['Class']) =>
  Object.entries(modules).reduce((options, [name, obj]) => {
    if (obj.prototype instanceof commandClass) {
      options.push({
        id: name,
        label: name,
        Class: obj,
      });
    }
    return options;
  }, [] as DSMCommandOption[]);

export const DSMCoreCommandOptions = (() => {
  const { AbstractCommand, ...rest } = DSMCore;
  return getCommandsFromModules(rest, AbstractCommand);
})();

export const DSMClientCommandOptions = (() => {
  const { AbstractCommand, ...rest } = DSMClient;
  return getCommandsFromModules(rest, AbstractCommand);
})();

export const DSMCommandOptions = [...DSMClientCommandOptions, ...DSMCoreCommandOptions].sort((a, b) =>
  a.label.toLowerCase().localeCompare(b.label.toLowerCase()),
);
