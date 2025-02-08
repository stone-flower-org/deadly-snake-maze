import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';

import { AbstractModel, IModelParams } from './abstract-model';

export interface IBodyState {
  id: number;
  type: string;
  parentId?: number;
  rigidBodyId: number;
  spaceId: number;
}

export type IBodyModelParams = IModelParams<IBodyState> & {
  rigidBody: PhysicsEngine.RigidBody;
};

export class BodyModel extends AbstractModel<IBodyState> {
  static idGenerator = createAutoincrementIdGenerator();

  static generateId() {
    return BodyModel.idGenerator();
  }

  static generateType() {
    return this.name;
  }

  protected _rigidBody: PhysicsEngine.RigidBody;

  constructor(params: IBodyModelParams) {
    super(params);
    this._rigidBody = params.rigidBody;
  }

  getBody() {
    return this._rigidBody;
  }

  getPosition() {
    return this._rigidBody.translation();
  }

  getRotation() {
    return this._rigidBody.rotation();
  }
}
