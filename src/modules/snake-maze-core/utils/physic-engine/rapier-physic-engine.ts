import RAPIER from '@dimforge/rapier3d';
import { type ITick } from '@stone-flower-org/js-utils';

export const EARTH_GRAVITY = 9.81;

export const DEFAULT_GRAVITY = new RAPIER.Vector3(0, EARTH_GRAVITY, 0);

export interface RapierPhysicEngineOptions {
  world: RAPIER.World;
}

export class RapierPhysicEngine {
  private _world: RAPIER.World;
  private _eventBus: RAPIER.EventQueue;

  static async create() {
    const world = new RAPIER.World(DEFAULT_GRAVITY);
    return new this({ world });
  }

  constructor({ world }: RapierPhysicEngineOptions) {
    this._world = world;
    this._eventBus = new RAPIER.EventQueue(true);
  }

  getWorld() {
    return this._world;
  }

  update(_: ITick) {
    this._world.step(this._eventBus);
    // this._event; // TODO: add physic events conversion
  }

  delete() {
    this._world.free();
  }
}
