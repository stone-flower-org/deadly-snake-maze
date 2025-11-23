import type RAPIER from '@dimforge/rapier3d';
import { type ITick } from '@stone-flower-org/js-utils';

import { eulerToQuaternion } from '@/src/modules/common/utils/rapier';

export { type Rapier3D as PhysicsEngine } from '@/src/modules/common/utils/rapier';

export const EARTH_GRAVITY = 9.81;

export interface RapierPhysicsEngineOptions {
  RAPIER: typeof RAPIER;
}

export class RapierPhysicsEngine {
  readonly originPosition: RAPIER.Vector3;
  readonly originRotation: RAPIER.Rotation;

  private _rapier: RapierPhysicsEngineOptions['RAPIER'];
  private _eventQ: RAPIER.EventQueue;

  static async create() {
    const RAPIER = await import('@dimforge/rapier3d');
    return new this({ RAPIER });
  }

  constructor({ RAPIER }: RapierPhysicsEngineOptions) {
    const originVec3 = new RAPIER.Vector3(0, 0, 0);
    const originRotation = eulerToQuaternion(originVec3);
    this._rapier = RAPIER;
    this._eventQ = new RAPIER.EventQueue(true);
    this.originPosition = originVec3;
    this.originRotation = new RAPIER.Quaternion(originRotation.x, originRotation.y, originRotation.z, originRotation.w);
  }

  createWorld() {
    return new this._rapier.World(new this._rapier.Vector3(0, -EARTH_GRAVITY, 0));
  }

  updateWorlds(worlds: RAPIER.World[], _: ITick) {
    worlds.forEach((world) => {
      world.step(this._eventQ);
      // TODO: get collisions from q and return as the response
    });
  }

  getRapier() {
    return this._rapier;
  }

  delete() {
    this._eventQ.free();
  }
}
