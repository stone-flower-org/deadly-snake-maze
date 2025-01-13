import { Sandbox } from '@/src/modules/snake-maze-debug/ui/components/pages/Cases/Sandbox';

export const CASES = [
  {
    id: 'sandbox',
    name: 'Sandbox',
    Component: Sandbox,
  },
  {
    id: 'chicken',
    name: 'Chicken',
    Component: () => null,
  },
  {
    id: 'snake',
    name: 'Snake',
    Component: () => null,
  },
];

export const CASES_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));
