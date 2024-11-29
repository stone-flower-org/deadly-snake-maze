import { Clock, IClock } from '@/src/modules/common/utils/threejs/time/clock';
import { IWithSyncedClock, WithSyncedClock } from '@/src/modules/common/utils/threejs/time/synced';

export interface ISyncedClock extends IWithSyncedClock<IClock> {}

export class SyncedClock extends WithSyncedClock(Clock) implements ISyncedClock {
  static create() {
    return new this();
  }
}
