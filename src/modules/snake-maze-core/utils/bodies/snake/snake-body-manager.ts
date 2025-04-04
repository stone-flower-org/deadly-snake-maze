import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { BodyMolecule, SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

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
      segments: _params.segments ?? 2,
      rotation: _params.rotation ?? this._app.getService('physicsEngine').originRotation,
      position: _params.position ?? this._app.getService('physicsEngine').originPosition,
    };

    const head = this._createHeadMolecule(params);

    // id: number;
    // type: string;
    // rootMoleculeId?: number;
    // moleculeIds: number[];
    // spaceId: number;

    // molecules: BodyMolecule[];

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
    const { space, rotation, position: oPosition } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const position = { ...oPosition };
    position.y += SnakeBody.MOLECULES.head.size.h;

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.fixed());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    const headMolecule = new BodyMolecule({
      rigidBody,
      type: SnakeBody.MOLECULES.head.type,
    });

    const shape = Rapier.ColliderDesc.cuboid(SnakeBody.MOLECULES.head.size.w, SnakeBody.MOLECULES.head.size.h, SnakeBody.MOLECULES.head.size.l);
    headMolecule.addAtom(world.createCollider(shape, rigidBody), SnakeBody.ATOMS.root.type);

    return headMolecule;
  }

  protected _addSegments(params: Required<CreateSnakeParams>) {
    // TODO: write me
  }
}
