import { createClassFromFunc, createEventBus } from '@stone-flower-org/js-utils';

export const EventBus = createClassFromFunc(createEventBus);

export type { EventBus as IEventBus } from '@stone-flower-org/js-utils';
