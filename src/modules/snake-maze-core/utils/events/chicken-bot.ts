import { type IPriorityEventBus } from '@stone-flower-org/js-utils';

import { AbstractDSMSGameubscriber } from './abstract-subscriber';
import { DSMGameBeforeUpdateEvent } from './dsm-game';
import { Priority } from './priorities';

export class ChickenBotSubscriber extends AbstractDSMSGameubscriber {
  listenDSMGameBeforeUpdateEvent(e: DSMGameBeforeUpdateEvent) {
    // TODO: write logic
  }

  subscribe(eventBus: IPriorityEventBus): void {
    this._subscribeListener(
      eventBus,
      DSMGameBeforeUpdateEvent,
      this.listenDSMGameBeforeUpdateEvent.bind(this),
      Priority.medium,
    );
  }
}
