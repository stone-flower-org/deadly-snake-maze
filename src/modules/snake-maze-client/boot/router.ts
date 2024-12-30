import { createElement } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { SNAKE_MAZE_CLIENT_PAGE_ID } from '@/src/modules/snake-maze-client/constants';

// TODO: write me
export const routes: RouteObject[] = [
  {
    path: '',
    lazy: () =>
      import('@/src/modules/main/ui/components/layouts/CommonLayout').then((module) => ({
        Component: () => createElement(module.default, undefined, createElement(Outlet)),
      })),
    children: [
      {
        id: SNAKE_MAZE_CLIENT_PAGE_ID,
        path: 'game',
        lazy: () =>
          import('@/src/modules/main/ui/components/pages/Main').then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
