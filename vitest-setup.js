const fs = require('fs');
const path = require('path');

const setupConfigs = async ({ provide }) => {
  const APP_CONFIG_FILE_PATH = path.resolve(__dirname, 'configs/config.test.json');

  const configs = await Promise.all(
    [APP_CONFIG_FILE_PATH].map(async (path) => JSON.parse(await fs.promises.readFile(path, 'utf-8'))),
  ).then(([appConfig]) => ({
    APP_LOCALE: appConfig.APP_LOCALE || '',
    APP_TZ: appConfig.APP_TZ || '',
  }));

  provide('CONFIGS', configs);

  return configs;
};

const setupEnvironment = (_, configs) => {
  process.env.TZ = configs.APP_TZ;
};

export const setup = async (ctx) => {
  const configs = await setupConfigs(ctx);
  setupEnvironment(ctx, configs);
};
