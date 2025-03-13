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

  static get BOUNDARY() {
    return {
      w: 1,
      h: 1,
    };
  }

  static get EXIT() {
    return {
      l: 1,
      w: 1,
      h: 0.1,
    };
  }

  static get HUNTER_SPAWN() {
    return {
      l: 1,
      w: 1,
      h: 0.1,
    };
  }

  static get PREY_SPAWN() {
    return {
      l: 1,
      w: 1,
      h: 0.1,
    };
  }

  static get BODY_PARTS() {
    return {
      boundary: 'boundary',
      exit: 'exit',
      floor: 'floor',
      hunterSpawn: 'hunterSpawn',
      preySpawn: 'preySpawn',
      wall: 'wall',
    };
  }

  getExit() {
    return this.findColliderByBodyPart(MazeBody.BODY_PARTS.exit);
  }

  getPreySpawn() {
    return this.findColliderByBodyPart(MazeBody.BODY_PARTS.preySpawn);
  }

  getHunterSpawn() {
    return this.findColliderByBodyPart(MazeBody.BODY_PARTS.hunterSpawn);
  }
}
