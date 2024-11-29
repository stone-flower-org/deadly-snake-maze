import { ServiceProvider } from '@stone-flower-org/js-app';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ThrowRouteError } from '@/src/modules/common/ui/components/ThrowRouteError';
import { createRoutesStore } from '@/src/modules/common/utils/react-router-dom';
import { routes as exampleRoutes } from '@/src/modules/main/boot';

export const routes: RouteObject[] = [
  {
    path: '/',
    ErrorBoundary: ThrowRouteError,
    children: [
      {
        path: '/',
        children: exampleRoutes,
      },
      {
        id: '403',
        path: '403',
        element: 'Permission Denied',
      },
      {
        id: '404',
        path: '*',
        element: 'Not Found',
      },
    ],
  },
];

export const routesStoreProvider = ServiceProvider.createFromFunc(() => createRoutesStore(routes));

export const routerProvider = ServiceProvider.createFromFunc(() => createBrowserRouter(routes));
