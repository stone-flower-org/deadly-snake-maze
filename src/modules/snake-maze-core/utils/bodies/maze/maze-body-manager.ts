import { eulerToQuaternion } from '@/src/modules/common/utils/rapier';
import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { MazeBody } from './maze-body';
import { MazeGraph, MazeGraphGenerator } from './maze-graph-generator';

export interface CreateMazeParams {
  space: SpaceModel;
  cells?: number;
  position?: PhysicsEngine.Vector3;
  rotation?: PhysicsEngine.Rotation;
}

export class MazeBodyManager extends AbstractBodyManager<MazeBody> {
  protected _mazeGraphGenerator = new MazeGraphGenerator();

  create(_params: CreateMazeParams) {
    const params = {
      cells: 10,
      ..._params,
      rotation: _params.rotation ?? this._app.getService('physicsEngine').originRotation,
      position: _params.position ?? this._app.getService('physicsEngine').originPosition,
    };

    const rigidBody = this._createRigidBody(params);

    const model = new MazeBody({
      rigidBody,
      state: {
        id: MazeBody.generateId(),
        type: MazeBody.generateType(),
        rigidBodyId: rigidBody.handle,
        spaceId: params.space.getId(),
      },
    });

    this._addFloor(model, params);

    this._addBoundaries(model, params);

    this._addBodiesFromMazeGraph(model, this._createMazeGraph(params), params);

    this.save([model]);

    return model;
  }

  protected _createRigidBody(params: Required<CreateMazeParams>) {
    const { space, rotation, position } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.fixed());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    return rigidBody;
  }

  protected _createMazeGraph({ cells }: Required<CreateMazeParams>) {
    return this._mazeGraphGenerator.generate({ xCells: cells, yCells: cells });
  }

  protected _addBodiesFromMazeGraph(body: MazeBody, mazeGraph: MazeGraph, params: Required<CreateMazeParams>) {
    console.log('---- mazeGraph', mazeGraph); // TODO: delete me
    const { space, cells } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const wl = MazeBody.CELL.w + MazeBody.WALL.w;

    const hwh = MazeBody.WALL.h / 2;
    const hww = MazeBody.WALL.w / 2;
    const hwl = wl / 2;

    // origin position
    const hfw = this._calcFloorSize(params) / 2;
    const oX = -hfw;
    const oZ = hfw;

    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const c = [x, y];
        const r = [x + 1, y];
        const b = [x, y + 1];

        // Right Wall
        if (r[0] < cells && mazeGraph.getEdge(c.join(), r.join())?.[2].wall) {
          const xOffest = (x + 1) * wl - hww;
          const zOffset = y * wl + hwl;

          const wallShape = Rapier.ColliderDesc.cuboid(hww, hwl, hwh);

          // Position
          wallShape.translation.x = oX + xOffest;
          wallShape.translation.y = hwh;
          wallShape.translation.z = oZ - zOffset;

          // Rotation
          wallShape.setRotation(eulerToQuaternion({ x: -Math.PI / 2, y: 0, z: 0 }));

          body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(wallShape, body.getBody()));
        }

        // Bottom Wall
        if (b[1] < cells && mazeGraph.getEdge(c.join(), b.join())?.[2].wall) {
          const xOffest = x * wl + hwl;
          const zOffset = y * wl + hwh;

          const wallShape = Rapier.ColliderDesc.cuboid(hwl, hwh, hww);

          // Position
          wallShape.translation.x = oX + xOffest;
          wallShape.translation.y = hwh;
          wallShape.translation.z = oZ - MazeBody.CELL.w - zOffset;

          // Rotation
          wallShape.setRotation(eulerToQuaternion({ x: -Math.PI / 2, y: 0, z: 0 }));

          body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(wallShape, body.getBody()));
        }
      }
    }
  }

  protected _addFloor(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const hfw = this._calcFloorSize(params) / 2;
    const hfh = MazeBody.FLOOR.h / 2;

    const floorShape = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    floorShape.translation.x = 0;
    floorShape.translation.y = -hfh;
    floorShape.translation.z = 0;

    floorShape.setRotation(eulerToQuaternion({ x: -Math.PI / 2, y: 0, z: 0 }));

    body.registerBodyPart(MazeBody.BODY_PARTS.floor, world.createCollider(floorShape, body.getBody()));
  }

  protected _addBoundaries(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const fw = this._calcFloorSize(params);
    const hfw = fw / 2;
    const oX = -hfw;
    const oZ = hfw;

    const hww = fw / 2;
    const hwh = MazeBody.WALL.h / 2;

    // Top wall
    const tWallShape = Rapier.ColliderDesc.cuboid(hww, hwh, hwh);

    tWallShape.translation.x = oX + hww;
    tWallShape.translation.y = hwh;
    tWallShape.translation.z = oZ - hwh;

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(tWallShape, body.getBody()));

    // Right wall
    const rWallShape = Rapier.ColliderDesc.cuboid(hwh, hwh, -hww);

    rWallShape.translation.x = oX + fw + hwh;
    rWallShape.translation.y = hwh;
    rWallShape.translation.z = oZ - hww;

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(rWallShape, body.getBody()));

    // Bottom wall
    const bWallShape = Rapier.ColliderDesc.cuboid(hww, hwh, hwh);

    bWallShape.translation.x = oX + hww;
    bWallShape.translation.y = hwh;
    bWallShape.translation.z = oZ - fw - hwh;

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(bWallShape, body.getBody()));

    // Left wall
    const lWallShape = Rapier.ColliderDesc.cuboid(hwh, hwh, -hww);

    lWallShape.translation.x = oX - hwh;
    lWallShape.translation.y = hwh;
    lWallShape.translation.z = oZ - hww;

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(lWallShape, body.getBody()));
  }

  _calcFloorSize({ cells }: Required<CreateMazeParams>) {
    return MazeBody.CELL.w * cells + MazeBody.WALL.w * (cells - 1);
  }
}
