import { ITick } from '@/src/modules/common/utils/threejs/time';

export interface IAnimated {
  update(tick: ITick): void;
}
