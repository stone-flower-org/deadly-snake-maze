import type { IEventBus } from '@/src/modules/common/utils/threejs/event-bus';

export interface IEventProducer extends Omit<IEventBus, 'emit'> {}
