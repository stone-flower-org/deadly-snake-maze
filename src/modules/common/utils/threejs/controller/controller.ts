import { type IEventProducer } from '@stone-flower-org/js-utils';

export interface IController extends IEventProducer {
  id: string;
  init(): Promise<void>;
  delete(): void;
}
