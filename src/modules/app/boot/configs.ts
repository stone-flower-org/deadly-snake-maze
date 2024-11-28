import { ServiceProvider } from '@stone-flower-org/js-app';

import { APP_CONFIG_URL_PATH } from '@/src/modules/app/constants';

import { axios } from './axios';

const fetchConfig = (path: string) =>
  axios
    .get(`${window.location.origin}/${path}`, {
      params: {
        v: process.env.APP_VERSION,
      },
    })
    .then((res) => res.data);

const configsPaths = [APP_CONFIG_URL_PATH];

export const configsProvider = ServiceProvider.createFromFunc(
  async () =>
    await Promise.all(configsPaths.map(fetchConfig)).then(async ([appConfigs]) => ({
      APP_LOCALE: String(appConfigs.APP_LOCALE ?? ''),
      APP_TZ: String(appConfigs.APP_TZ ?? ''),
    })),
);
