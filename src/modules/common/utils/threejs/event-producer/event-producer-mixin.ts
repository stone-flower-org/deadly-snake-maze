import { EventBus } from '@/src/modules/common/utils/threejs/event-bus';

import { IEventProducer } from './event-producer';

import type { Args, Constructor, ListenerFunc } from '@stone-flower-org/js-utils';

export type IWithEventProducer<T = object> = IEventProducer & T;

export const WithEventProducer = <S extends Constructor>(superclass: S) =>
  class extends superclass {
    private _eventBus = new EventBus();

    on(event: string, listener: ListenerFunc) {
      return this._eventBus.on(event, listener);
    }

    off(event: string, listener: ListenerFunc) {
      this._eventBus.off(event, listener);
    }

    removeAllListeners() {
      this._eventBus.removeAllListeners();
    }

    protected emit<A extends Args = Args>(event: string, ...args: A) {
      this._eventBus.emit(event, ...args);
    }
  };
