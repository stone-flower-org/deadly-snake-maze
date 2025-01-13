import { type ITick, type IWithEventProducer } from '@stone-flower-org/js-utils';

export interface ISimulation extends IWithEventProducer {
  update(tick: ITick): void;
  delete(): void;
}
