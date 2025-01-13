import { type ITick, WithEventProducer } from '@stone-flower-org/js-utils';

import { ISimulation } from './simulation';

export abstract class AbstractSimulation extends WithEventProducer(Function) implements ISimulation {
  static get EVENTS() {
    return {
      aftertick: 'aftertick',
      beforetick: 'beforetick',
    };
  }

  update(tick: ITick) {
    this._eventBus.emit(AbstractSimulation.EVENTS.beforetick, tick);
    this.onTick(tick);
    this._eventBus.emit(AbstractSimulation.EVENTS.aftertick, tick);
  }

  delete() {
    this.removeAllListeners();
  }

  abstract onTick(tick: ITick): void;
}
