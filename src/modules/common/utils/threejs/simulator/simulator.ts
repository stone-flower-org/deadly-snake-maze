import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';
import { ITick } from '@/src/modules/common/utils/threejs/time';

export interface ISimulator {
  simulate(state: IGlobalState, tick: ITick): void;
  delete(): void;
}

export class Simulator implements ISimulator {
  static create() {
    return new this();
  }

  simulate({ scene }: IGlobalState, tick: ITick) {
    scene?.update(tick);
  }

  delete() {
    //
  }
}
