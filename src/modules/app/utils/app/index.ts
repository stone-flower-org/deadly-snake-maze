import { Router } from '@remix-run/router';
import { Axios } from 'axios';
// eslint-disable-next-line import/no-unresolved
import { SetupWorker } from 'msw/lib/browser';
// eslint-disable-next-line import/no-unresolved
import { SetupServer } from 'msw/lib/node';

import { configsProvider } from '@/src/modules/app/boot/configs';
import { luxonProvider } from '@/src/modules/app/boot/luxon';
import { RootStore } from '@/src/modules/app/utils/store/types';
import { RoutesStore } from '@/src/modules/common/utils/react-router-dom';

export type AppConfigs = ReturnType<typeof configsProvider.get>;

export interface AppServices {
  configs: AppConfigs;
  date: ReturnType<typeof luxonProvider.get>;
  http: Axios;
  server: SetupWorker | SetupServer;
  store: RootStore;
  router: Router;
  routesStore: RoutesStore;
}

export type AppServicesKey = keyof AppServices;
