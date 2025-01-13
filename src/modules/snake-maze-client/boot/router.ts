import { RouteObject } from 'react-router-dom';

import { SNAKE_MAZE_CLIENT_PAGE_ID } from '@/src/modules/snake-maze-client/constants';

// TODO: write me
export const routes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        id: SNAKE_MAZE_CLIENT_PAGE_ID,
        path: 'game',
        lazy: () =>
          import('@/src/modules/snake-maze-client/ui/components/routes/Main').then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
];
