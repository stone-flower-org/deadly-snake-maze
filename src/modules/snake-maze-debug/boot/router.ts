import { createElement } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { SNAKE_MAZE_DEBUG_CASE_PAGE_ID, SNAKE_MAZE_DEBUG_PAGE_ID } from '@/src/modules/snake-maze-debug/constants';

export const routes: RouteObject[] = [
  {
    path: 'debug',
    lazy: () =>
      import('@/src/modules/snake-maze-debug/ui/components/layouts/CommonLayout').then((module) => ({
        Component: () => createElement(module.default, undefined, createElement(Outlet)),
      })),
    children: [
      {
        id: SNAKE_MAZE_DEBUG_PAGE_ID,
        index: true,
        path: '',
        lazy: () =>
          import('@/src/modules/snake-maze-debug/ui/components/pages/Main').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ':caseId',
        lazy: () =>
          import('@/src/modules/snake-maze-debug/ui/components/layouts/CaseLayout').then((module) => ({
            Component: () => createElement(module.default, undefined, createElement(Outlet)),
          })),
        children: [
          {
            id: SNAKE_MAZE_DEBUG_CASE_PAGE_ID,
            index: true,
            path: '',
            lazy: () =>
              import('@/src/modules/snake-maze-debug/ui/components/pages/Cases').then((module) => ({
                Component: module.default,
              })),
          },
        ],
      },
    ],
  },
];
