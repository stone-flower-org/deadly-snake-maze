import { createContextSaver, type Constructor } from '@stone-flower-org/js-utils';

import { IClock } from '@/src/modules/common/utils/threejs/time/clock';
import { ITick, ITickingClock, TickingClock } from '@/src/modules/common/utils/threejs/time/ticking-clock';

export type IWithSyncedClock<T = object> = {
  syncClock(clock: ITickingClock): void;
} & T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithSyncedClock = <S extends Constructor<any[], IClock>>(superclass: S) =>
  class extends superclass {
    protected _syncBinder = createContextSaver(this);
    protected _syncClock?: ITickingClock;
    protected _lastTick?: ITick;

    syncClock(clock: ITickingClock) {
      this._setSyncClock(clock);
    }

    delete() {
      this._setSyncClock(undefined);
      super.delete();
    }

    protected _onTick(tick: ITick) {
      this._lastTick = tick;
    }

    protected _setSyncClock(clock?: ITickingClock) {
      if (this._syncClock) {
        this._syncClock.off(TickingClock.EVENTS.tick, this._syncBinder.useFunc(this._onTick));
        return;
      }

      this._syncClock = clock;
      this._lastTick = clock?.getLastTick();
      this._syncClock?.on(TickingClock.EVENTS.tick, this._syncBinder.useFunc(this._onTick));
    }

    protected _now() {
      return this._lastTick?.time ?? 0;
    }
  };
