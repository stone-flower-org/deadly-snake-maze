import { createElement } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { DEADLY_MAZE_DEBUG_CASE_PAGE_ID, DEADLY_MAZE_DEBUG_PAGE_ID } from '@/src/modules/deadly-maze-debug/constants';

export const routes: RouteObject[] = [
  {
    path: 'debug',
    lazy: () =>
      import('@/src/modules/deadly-maze-debug/ui/components/layouts/CommonLayout').then((module) => ({
        Component: () => createElement(module.default, undefined, createElement(Outlet)),
      })),
    children: [
      {
        id: DEADLY_MAZE_DEBUG_PAGE_ID,
        index: true,
        path: '',
        lazy: () =>
          import('@/src/modules/deadly-maze-debug/ui/components/pages/Main').then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: ':caseId',
        lazy: () =>
          import('@/src/modules/deadly-maze-debug/ui/components/layouts/CaseLayout').then((module) => ({
            Component: () => createElement(module.default, undefined, createElement(Outlet)),
          })),
        children: [
          {
            id: DEADLY_MAZE_DEBUG_CASE_PAGE_ID,
            index: true,
            path: '',
            lazy: () =>
              import('@/src/modules/deadly-maze-debug/ui/components/pages/Cases').then((module) => ({
                Component: module.default,
              })),
          },
        ],
      },
    ],
  },
];
