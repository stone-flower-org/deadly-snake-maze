import { Game } from '@/src/modules/snake-maze-debug/ui/components/pages/Cases/Game';
import { MazeGeneration } from '@/src/modules/snake-maze-debug/ui/components/pages/Cases/MazeGeneration';

export const CASES = [
  {
    id: 'game',
    name: 'Game',
    Component: Game,
  },
  {
    id: 'maze',
    name: 'Maze',
    Component: MazeGeneration,
  },
  {
    id: 'chicken',
    name: 'Chicken',
    Component: () => null,
  },
  {
    id: 'chicken-escape',
    name: 'Chicken Escape',
    Component: () => null,
  },
  {
    id: 'snake',
    name: 'Snake',
    Component: () => null,
  },
  {
    id: 'snake-collision',
    name: 'Snake ',
    Component: () => null,
  },
];

export const CASES_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));
