import { makeConfigs } from '@/src/modules/tests/mocked-data';

export const makeConfigsProvider = () => {
  const configs = makeConfigs();
  return {
    boot: async () => configs,
    get: () => configs,
  };
};
