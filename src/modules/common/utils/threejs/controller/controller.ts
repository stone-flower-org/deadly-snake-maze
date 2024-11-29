import { IEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

export interface IController extends IEventProducer {
  id: string;
  init(): Promise<void>;
  delete(): void;
}
