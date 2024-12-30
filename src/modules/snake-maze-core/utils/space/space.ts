import { IBody } from '@/src/modules/snake-maze-core/utils/body';

export interface ISpace {
  id: number;
  bodies: Record<IBody['id'], IBody>;
}
