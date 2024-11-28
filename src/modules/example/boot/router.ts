import { createElement } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '',
    lazy: () =>
      import('@/src/modules/example/ui/components/layouts/CommonLayout').then((module) => ({
        Component: () => createElement(module.default, undefined, createElement(Outlet)),
      })),
    children: [
      {
        id: 'index',
        path: '',
        lazy: () =>
          import('@/src/modules/example/ui/components/pages/IndexPage').then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
