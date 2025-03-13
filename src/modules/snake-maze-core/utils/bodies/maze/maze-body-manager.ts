import { eulerToQuaternion, Rapier3D } from '@/src/modules/common/utils/rapier';
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
      cells: 9,
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
    const { cells } = params;
    
    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const cell: [number, number] = [x, y];
        const r = [x + 1, y];
        const b = [x, y + 1];
        const nodeKey = cell.join();

        // Exit
        if (mazeGraph.getNode(nodeKey)[1]?.exit) {
          this._addMazeExit(body, params, cell);
        }

        // Hunter Spawn
        if (mazeGraph.getNode(nodeKey)[1]?.hunterSpawn) {
          this._addMazeHunterSpawn(body, params, cell);
        }
        
         // Prey Spawn
        if (mazeGraph.getNode(nodeKey)[1]?.preySpawn) {
          this._addMazePreySpawn(body, params, cell);
        }

        // Right Wall
        if (r[0] < cells && mazeGraph.getEdge(nodeKey, r.join())?.[2].wall) {
          this._addMazeCellRightWall(body, params, cell);
        }

        // Bottom Wall
        if (b[1] < cells && mazeGraph.getEdge(nodeKey, b.join())?.[2].wall) {
          this._addMazeCellBottomtWall(body, params, cell);
        }
      }
    }
  }

  protected _addMazeCellRightWall(body: MazeBody, params: Required<CreateMazeParams>, [x, y]: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    // Origin Position
    const [oX, oY, oZ] = this._calcMazeOrigin(params);

    // Wall sizes
    const wallDesc = this._createWallDesc(params);
    const wallShape = wallDesc.shape as Rapier3D.Cuboid;

    const xOffest = (x + 1) * wallShape.halfExtents.x * 2 - wallShape.halfExtents.z;
    const zOffset = y * wallShape.halfExtents.x * 2 + wallShape.halfExtents.x;

    // Position
    wallDesc.translation.x = oX + xOffest;
    wallDesc.translation.y = oY + wallShape.halfExtents.y;
    wallDesc.translation.z = oZ - zOffset;

    // Rotation
    wallDesc.setRotation(eulerToQuaternion({ x: 0, y: Math.PI / 2, z: 0 }));

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(wallDesc, body.getBody()));
  }

  protected _addMazeCellBottomtWall(body: MazeBody, params: Required<CreateMazeParams>, [x, y]: [number, number]) {
    const { space } = params;
    const world = space.getWorld();

    // Origin Position
    const [oX, oY, oZ] = this._calcMazeOrigin(params);

    const wallDesc = this._createWallDesc(params);
    const wallShape = wallDesc.shape as Rapier3D.Cuboid;

    const xOffest = x * wallShape.halfExtents.x * 2 + wallShape.halfExtents.x;
    const zOffset = (y + 1) * wallShape.halfExtents.x * 2 - wallShape.halfExtents.z;

    // Position
    wallDesc.translation.x = oX + xOffest;
    wallDesc.translation.y = oY + wallShape.halfExtents.y;
    wallDesc.translation.z = oZ - zOffset;

    body.registerBodyPart(MazeBody.BODY_PARTS.wall, world.createCollider(wallDesc, body.getBody()));
  }

  protected _addFloor(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const hfw = this._calcFloorSize(params) / 2;
    const hfh = MazeBody.FLOOR.h / 2;

    const floorDesc = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    floorDesc.translation.x = 0;
    floorDesc.translation.y = -hfh;
    floorDesc.translation.z = 0;

    floorDesc.setRotation(eulerToQuaternion({ x: -Math.PI / 2, y: 0, z: 0 }));

    body.registerBodyPart(MazeBody.BODY_PARTS.floor, world.createCollider(floorDesc, body.getBody()));
  }

  protected _addBoundaries(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    // Origin Position
    const [oX, oY, oZ] = this._calcMazeOrigin(params);

    const fw = this._calcFloorSize(params);
    const hww = fw / 2;
    const hwh = MazeBody.WALL.h / 2;

    const createBoundary = () => Rapier.ColliderDesc.cuboid(hww, hwh, hwh);

    // Top wall
    const tWallDesc = createBoundary();

    tWallDesc.translation.x = oX + hww;
    tWallDesc.translation.y = oY + hwh;
    tWallDesc.translation.z = oZ + hwh;

    body.registerBodyPart(MazeBody.BODY_PARTS.boundary, world.createCollider(tWallDesc, body.getBody()));

    // Right wall
    const rWallDesc = createBoundary();

    rWallDesc.translation.x = oX + fw + hwh;
    rWallDesc.translation.y = oY + hwh;
    rWallDesc.translation.z = oZ - hww;

    rWallDesc.setRotation(eulerToQuaternion({ x: 0, y: Math.PI / 2, z: 0 }));

    body.registerBodyPart(MazeBody.BODY_PARTS.boundary, world.createCollider(rWallDesc, body.getBody()));

    // Bottom wall
    const bWallDesc = createBoundary();

    bWallDesc.translation.x = oX + hww;
    bWallDesc.translation.y = oY + hwh;
    bWallDesc.translation.z = oZ - fw - hwh;

    body.registerBodyPart(MazeBody.BODY_PARTS.boundary, world.createCollider(bWallDesc, body.getBody()));

    // Left wall
    const lWallDesc = createBoundary();

    lWallDesc.translation.x = oX - hwh;
    lWallDesc.translation.y = oY + hwh;
    lWallDesc.translation.z = oZ - hww;

    lWallDesc.setRotation(eulerToQuaternion({ x: 0, y: Math.PI / 2, z: 0 }));

    body.registerBodyPart(MazeBody.BODY_PARTS.boundary, world.createCollider(lWallDesc, body.getBody()));
  }

  protected _addMazeExit(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.CELL.w) / 2;

    const exitDesc = Rapier.ColliderDesc.cuboid(MazeBody.EXIT.l, MazeBody.EXIT.h, MazeBody.EXIT.w);
    const exitShape = exitDesc.shape as Rapier3D.Cuboid;

    exitDesc.translation.x = oX + offset;
    exitDesc.translation.y = oY + exitShape.halfExtents.y;
    exitDesc.translation.z = oZ - offset;

    body.registerBodyPart(MazeBody.BODY_PARTS.exit, world.createCollider(exitDesc, body.getBody()));
  }

  protected _addMazeHunterSpawn(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.CELL.w) / 2;

    const hunterSpawnDesc = Rapier.ColliderDesc.cuboid(MazeBody.HUNTER_SPAWN.l, MazeBody.HUNTER_SPAWN.h, MazeBody.HUNTER_SPAWN.w);
    const hunterSpawnShape = hunterSpawnDesc.shape as Rapier3D.Cuboid;

    hunterSpawnDesc.translation.x = oX + offset;
    hunterSpawnDesc.translation.y = oY + hunterSpawnShape.halfExtents.y;
    hunterSpawnDesc.translation.z = oZ - offset;

    body.registerBodyPart(MazeBody.BODY_PARTS.hunterSpawn, world.createCollider(hunterSpawnDesc, body.getBody()));
  }

  protected _addMazePreySpawn(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.CELL.w) / 2;

    const preySpawnDesc = Rapier.ColliderDesc.cuboid(MazeBody.PREY_SPAWN.l, MazeBody.PREY_SPAWN.h, MazeBody.PREY_SPAWN.w);
    const preySpawnShape = preySpawnDesc.shape as Rapier3D.Cuboid;

    preySpawnDesc.translation.x = oX + offset;
    preySpawnDesc.translation.y = oY + preySpawnShape.halfExtents.y;
    preySpawnDesc.translation.z = oZ - offset;

    body.registerBodyPart(MazeBody.BODY_PARTS.preySpawn, world.createCollider(preySpawnDesc, body.getBody()));
  }

  protected _calcFloorSize({ cells }: Required<CreateMazeParams>) {
    return MazeBody.CELL.w * cells + MazeBody.WALL.w * (cells - 1);
  }

  protected _calcWallSize(_: Required<CreateMazeParams>) {
    return [MazeBody.CELL.w + MazeBody.WALL.w, MazeBody.WALL.h, MazeBody.WALL.w];
  }

  protected _calcMazeOrigin(params: Required<CreateMazeParams>) {
    const hfw = this._calcFloorSize(params) / 2;
    return [-hfw, 0, hfw];
  }

  protected _calcMazeCellOrigin(params: Required<CreateMazeParams>, [x, y]: [number, number]) {
    const [wl] = this._calcWallSize(params);
    const [oX, oY, oZ] = this._calcMazeOrigin(params);
    const coX = oX + x * wl;
    const coZ = oZ - y * wl;
    return [coX, oY, coZ];
  }

  protected _createWallDesc(params: Required<CreateMazeParams>) {
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const [wl, wh, ww] = this._calcWallSize(params);    
    return Rapier.ColliderDesc.cuboid(wl / 2, wh / 2, ww / 2);
  }
}
