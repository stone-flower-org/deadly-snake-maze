import { AbstractBodyManager } from '@/src/modules/deadly-maze-core/utils/bodies/body';
import { PhysicsEngine } from '@/src/modules/deadly-maze-core/utils/physics-engine';
import { BodyMolecule, SpaceModel } from '@/src/modules/deadly-maze-core/utils/store';

import { SnakeBody } from './snake-body';

export interface CreateSnakeParams {
  space: SpaceModel;
  segments?: number;
  position?: PhysicsEngine.Vector3;
  rotation?: PhysicsEngine.Rotation;
}

export class SnakeBodyManager extends AbstractBodyManager<SnakeBody> {
  create(_params: CreateSnakeParams) {
    // TODO: write me
    const params = {
      ..._params,
      segments: _params.segments ?? 3,
      rotation: _params.rotation ?? this._app.getService('physicsEngine').originRotation,
      position: _params.position ?? this._app.getService('physicsEngine').originPosition,
    };

    const head = this._createHeadMolecule(params);

    const model = new SnakeBody({
      molecules: [head],
      state: {
        id: SnakeBody.generateId(),
        type: SnakeBody.generateType(),
        rootMoleculeId: head.getId(),
        moleculeIds: [head.getId()],
        spaceId: params.space.getId(),
      },
    });

    this.save([model]);

    return model;
  }

  protected _createHeadMolecule(params: Required<CreateSnakeParams>) {
    const { space, rotation, position } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.dynamic());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    const headMolecule = new BodyMolecule({
      rigidBody,
      type: SnakeBody.MOLECULES.head.type,
    });

    const shape = Rapier.ColliderDesc.ball(SnakeBody.ATOMS.head.size.r);
    shape.translation.y += SnakeBody.ATOMS.head.size.r;

    headMolecule.addAtom(world.createCollider(shape, rigidBody), SnakeBody.ATOMS.head.type);

    return headMolecule;
  }

  protected _addSegments(body: SnakeBody, params: Required<CreateSnakeParams>) {
    // TODO: write me
  }

  protected _addTail(body: SnakeBody, params: Required<CreateSnakeParams>) {
    // TODO: write me
  }
}
