import { ServiceProvider } from '@stone-flower-org/js-app';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { NOT_FOUND_PAGE_ID } from '@/src/modules/app/constants/router';
import { ThrowRouteError } from '@/src/modules/common/ui/components/ThrowRouteError';
import { createRoutesStore } from '@/src/modules/common/utils/react-router-dom';
import { routes as mainRoutes } from '@/src/modules/main/boot';
import { routes as snakeMazeClientRoutes } from '@/src/modules/snake-maze-client/boot';
import { routes as snakeMazeDebugRoutes } from '@/src/modules/snake-maze-debug/boot';

export const routes: RouteObject[] = [
  {
    path: '/',
    ErrorBoundary: ThrowRouteError,
    children: [
      {
        path: '',
        children: mainRoutes,
      },
      {
        path: '',
        children: snakeMazeClientRoutes,
      },
      {
        path: '',
        children: snakeMazeDebugRoutes,
      }, // TODO: hide when not in development mode
      {
        id: NOT_FOUND_PAGE_ID,
        path: '*',
        element: 'Not Found',
      },
    ],
  },
];

export const routesStoreProvider = ServiceProvider.createFromFunc(() => createRoutesStore(routes));

export const routerProvider = ServiceProvider.createFromFunc(() => createBrowserRouter(routes));
