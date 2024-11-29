import { Router } from '@remix-run/router';
import { Axios } from 'axios';

import { configsProvider } from '@/src/modules/app/boot/configs';
import { luxonProvider } from '@/src/modules/app/boot/luxon';
import { RootStore } from '@/src/modules/app/utils/store/types';
import { RoutesStore } from '@/src/modules/common/utils/react-router-dom';

export type AppConfigs = ReturnType<typeof configsProvider.get>;

export interface AppServices {
  configs: AppConfigs;
  date: ReturnType<typeof luxonProvider.get>;
  http: Axios;
  store: RootStore;
  router: Router;
  routesStore: RoutesStore;
}

export type AppServicesKey = keyof AppServices;
