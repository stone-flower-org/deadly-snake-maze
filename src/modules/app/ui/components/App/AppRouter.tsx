import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { app } from '@/src/modules/app/boot';
import { DefaultFallback } from '@/src/modules/common/ui/components/Loadable';

export const AppRouter = () => (
  <RouterProvider
    fallbackElement={<DefaultFallback title="Loading Page..." />}
    router={app.getService('router')}
  />
);
