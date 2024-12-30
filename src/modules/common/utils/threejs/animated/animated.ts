import { type ITick } from '@stone-flower-org/js-utils';

export interface IAnimated {
  update(tick: ITick): void;
}
