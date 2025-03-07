import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { IBodyUserData } from '@/src/modules/snake-maze-core/utils/bodies/body';
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
    this._rigidBody.userData = params.rigidBody.userData ?? this._createUserData();
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

  getUserData() {
    return this.getBody().userData as ReturnType<typeof this._createUserData>;
  }

  registerBodyPart(bodyPart: string, _: PhysicsEngine.Collider) {
    this.getUserData().bodyParts.push(bodyPart);
  }

  protected _createUserData() {
    return {
      bodyParts: [],
    } as IBodyUserData;
  }
}
