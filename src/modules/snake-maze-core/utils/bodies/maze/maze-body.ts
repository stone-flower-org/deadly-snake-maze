import { IBodyUserData } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export type IMazeBodyUserData = IBodyUserData;

export class MazeBody extends BodyModel {
  static get CELL() {
    return {
      w: 5,
    };
  }

  static get FLOOR() {
    return {
      h: 0.1,
    };
  }

  static get WALL() {
    return {
      w: 1,
      h: 1,
    };
  }

  static get BODY_PARTS() {
    return {
      floor: 'floor',
      wall: 'wall',
    };
  }
}
