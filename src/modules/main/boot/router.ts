import { createElement } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { MAIN_PAGE_ID } from '@/src/modules/main/constants';

export const routes: RouteObject[] = [
  {
    path: '',
    lazy: () =>
      import('@/src/modules/main/ui/components/layouts/CommonLayout').then((module) => ({
        Component: () => createElement(module.default, undefined, createElement(Outlet)),
      })),
    children: [
      {
        id: MAIN_PAGE_ID,
        path: '',
        lazy: () =>
          import('@/src/modules/main/ui/components/pages/Main').then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
