import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';

import { AbstractModel, IModelParams } from './abstract-model';

export interface ISpaceState {
  id: number;
  type: string;
  world: PhysicsEngine.World;
}

export type ISpaceModelParams = IModelParams<ISpaceState>;

export class SpaceModel extends AbstractModel<ISpaceState> {
  static idGenerator = createAutoincrementIdGenerator();

  static generateId() {
    return SpaceModel.idGenerator();
  }

  static generateType() {
    return this.name;
  }

  constructor(params: ISpaceModelParams) {
    super(params);
  }

  getWorld() {
    return this._state.world;
  }
}
