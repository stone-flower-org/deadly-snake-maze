import { ServiceProvider } from '@stone-flower-org/js-app';

import { setupWorker } from '@/src/modules/tests/utils/msw/setup/browser';

export const serverProvider = ServiceProvider.createFromFunc(async () => {
  const server = await setupWorker();
  await server.start();
  return server;
});
