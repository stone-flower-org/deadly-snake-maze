import { RouteObject } from 'react-router-dom';

import { DEADLY_MAZE_CLIENT_PAGE_ID } from '@/src/modules/deadly-maze-client/constants';

// TODO: write me
export const routes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        id: DEADLY_MAZE_CLIENT_PAGE_ID,
        path: 'game',
        lazy: () =>
          import('@/src/modules/deadly-maze-client/ui/components/routes/Main').then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
