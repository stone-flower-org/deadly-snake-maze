import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { SnakeBody } from './snake-body';

export interface CreateSnakeParams {
  space: SpaceModel;
  position?: PhysicsEngine.Vector3;
  rotation?: PhysicsEngine.Rotation;
}

export class SnakeBodyManager extends AbstractBodyManager<SnakeBody> {
  create(_params: CreateSnakeParams) {
    const params = {
      ..._params,
      rotation: _params.rotation ?? this._app.getService('physicsEngine').originRotation,
      position: _params.position ?? this._app.getService('physicsEngine').originPosition,
      cells: 9,
    };

    const rigidBody = this._createRigidBody(params);

    const model = new SnakeBody({
      rigidBody,
      state: {
        id: SnakeBody.generateId(),
        type: SnakeBody.generateType(),
        rigidBodyId: rigidBody.handle,
        spaceId: params.space.getId(),
      },
    });

    this.save([model]);

    return model;
  }

  protected _createRigidBody(params: Required<CreateSnakeParams>) {
    // TODO: write me
    const { space, rotation, position } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.fixed());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    // Box
    // const shape = Rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    // world.createCollider(shape, rigidBody);

    return rigidBody;
  }
}
