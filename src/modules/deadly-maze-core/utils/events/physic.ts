import { type IPriorityEventBus } from '@stone-flower-org/js-utils';

import { AbstractEvent } from './abstract-event';
import { AbstractDSMSGameubscriber } from './abstract-subscriber';

// export interface IMoveCommandPayload {} // TOOD: write me

// export class MoveCommand extends AbstractCommand<IMoveCommandPayload> {}

export interface IPhysicUpdateEventPayload {}

export class PhysicUpdateEvent extends AbstractEvent<IPhysicUpdateEventPayload> {}

export class PhysicSubscriber extends AbstractDSMSGameubscriber {
  subscribe(eventBus: IPriorityEventBus) {
    //
  }
}
