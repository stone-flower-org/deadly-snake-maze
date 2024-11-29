import { IWithSyncedClock, WithSyncedClock } from '@/src/modules/common/utils/threejs/time/synced';
import { ITimer, Timer } from '@/src/modules/common/utils/threejs/time/timer';

export interface ISyncedTimer extends IWithSyncedClock<ITimer> {}

export interface ISyncedTimerOptions {
  scheduledTime?: number;
}

export class SyncedTimer extends WithSyncedClock(Timer) implements ISyncedTimer {
  static create() {
    return new this();
  }
}
