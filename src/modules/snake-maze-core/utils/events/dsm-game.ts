import { compose, type IPriorityEventBus, type ITick } from '@stone-flower-org/js-utils';

import { IGame } from '@/src/modules/snake-maze-core/utils/game';
import { DSMValidation } from '@/src/modules/snake-maze-core/utils/validation';

import { AbstractEvent } from './abstract-event';
import { AbstractDSMSGameubscriber } from './abstract-subscriber';
import { Priority } from './priorities';

export interface IDSMGameEventPayload {
  game: IGame;
}

export interface IDSMGameUpdateEventPayload {
  game: IGame;
  tick: ITick;
}

export class DSMGameBootEvent extends AbstractEvent<IDSMGameEventPayload> {}

export class DSMGameBeforeUpdateEvent extends AbstractEvent<IDSMGameUpdateEventPayload> {}

export class DSMGameAfterUpdateEvent extends AbstractEvent<IDSMGameUpdateEventPayload> {}

export class DSMGameUpdateEvent extends AbstractEvent<IDSMGameUpdateEventPayload> {}

export class DSMGameDeleteEvent extends AbstractEvent<IDSMGameEventPayload> {}

export class DSMGameSubscriber extends AbstractDSMSGameubscriber {
  listenDSMGameUpdateEvent(e: DSMGameUpdateEvent) {
    this._game.getService('physicEngine').update(e.payload.tick);
  }

  listenDSMGameAfterUpdateEvent(_: DSMGameAfterUpdateEvent) {
    this._game.getStore().notify();
  }

  subscribe(eventBus: IPriorityEventBus) {
    this._subscribeListener(eventBus, DSMGameUpdateEvent, this.listenDSMGameUpdateEvent.bind(this), Priority.system);
    this._subscribeListener(
      eventBus,
      DSMGameAfterUpdateEvent,
      this.listenDSMGameAfterUpdateEvent.bind(this),
      Priority.system,
    );
  }
}
