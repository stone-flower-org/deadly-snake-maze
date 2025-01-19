import { type ITick } from '@stone-flower-org/js-utils';

import type RAPIER from '@dimforge/rapier3d';

export const EARTH_GRAVITY = 9.81;

export interface RapierPhysicEngineOptions {
  RAPIER: typeof RAPIER;
}

export class RapierPhysicEngine {
  private _world: RAPIER.World;
  private _eventQ: RAPIER.EventQueue;

  static async create() {
    const RAPIER = await import('@dimforge/rapier3d');
    return new this({ RAPIER });
  }

  constructor({ RAPIER }: RapierPhysicEngineOptions) {
    this._world = new RAPIER.World(new RAPIER.Vector3(0, EARTH_GRAVITY, 0));
    this._eventQ = new RAPIER.EventQueue(true);
  }

  getWorld() {
    return this._world;
  }

  update(_: ITick) {
    this._world.step(this._eventQ);
    // this._event; // TODO: add physic events conversion
  }

  delete() {
    this._world.free();
  }
}
