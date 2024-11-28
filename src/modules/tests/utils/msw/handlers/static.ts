import { APP_CONFIG_URL_PATH } from '@/src/modules/app/constants';
import { makeConfigs } from '@/src/modules/tests/mocked-data';
import { Router } from '@/src/modules/tests/utils/msw/types';
import { makeJsonResponseResolver } from '@/src/modules/tests/utils/msw/utils';

export const STATIC_ROUTER: Router = {
  configs: {
    method: 'get',
    url: APP_CONFIG_URL_PATH,
    resolver: makeJsonResponseResolver(makeConfigs),
  },
};
