import { type ITick } from '@stone-flower-org/js-utils';

import type RAPIER from '@dimforge/rapier3d';

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
    this._rapier = RAPIER;
    this._eventQ = new RAPIER.EventQueue(true);
    this.originPosition = new RAPIER.Vector3(0, 0, 0);
    this.originRotation = new RAPIER.Quaternion(0, 0, 0, 1);
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
