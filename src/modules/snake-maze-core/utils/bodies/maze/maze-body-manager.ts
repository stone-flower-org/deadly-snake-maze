import { eulerToQuaternion, Rapier3D } from '@/src/modules/common/utils/rapier';
import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { BodyMolecule, SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

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

    const rootMolecule = this._createRootMolecule(params);

    const model = new MazeBody({
      molecules: [rootMolecule],
      state: {
        id: MazeBody.generateId(),
        type: MazeBody.generateType(),
        rootMoleculeId: rootMolecule.getId(),
        moleculeIds: [rootMolecule.getId()],
        spaceId: params.space.getId(),
      },
    });

    this._addFloor(model, params);

    this._addBoundaries(model, params);

    this._addBodiesFromMazeGraph(model, this._createMazeGraph(params), params);

    this.save([model]);

    return model;
  }

  protected _createRootMolecule(params: Required<CreateMazeParams>) {
    const { space, rotation, position } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.fixed());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    const molecule = new BodyMolecule({
      rigidBody,
      type: MazeBody.MOLECULES.root.type,
    });

    return molecule;
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

    body.getRootMolecule()?.addAtom(world.createCollider(wallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.wall.type);
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

    body.getRootMolecule()?.addAtom(world.createCollider(wallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.wall.type);
  }

  protected _addFloor(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const hfw = this._calcFloorSize(params) / 2;
    const hfh = MazeBody.ATOMS.floor.size.h / 2;

    const floorDesc = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    floorDesc.translation.x = 0;
    floorDesc.translation.y = -hfh;
    floorDesc.translation.z = 0;

    floorDesc.setRotation(eulerToQuaternion({ x: -Math.PI / 2, y: 0, z: 0 }));

    body.getRootMolecule()?.addAtom(world.createCollider(floorDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.floor.type);
  }

  protected _addBoundaries(body: MazeBody, params: Required<CreateMazeParams>) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    // Origin Position
    const [oX, oY, oZ] = this._calcMazeOrigin(params);

    const fw = this._calcFloorSize(params);
    const hww = fw / 2;
    const hwh = MazeBody.ATOMS.wall.size.h / 2;

    const createBoundary = () => Rapier.ColliderDesc.cuboid(hww, hwh, hwh);

    // Top wall
    const tWallDesc = createBoundary();

    tWallDesc.translation.x = oX + hww;
    tWallDesc.translation.y = oY + hwh;
    tWallDesc.translation.z = oZ + hwh;

    body.getRootMolecule()?.addAtom(world.createCollider(tWallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.boundary.type);

    // Right wall
    const rWallDesc = createBoundary();

    rWallDesc.translation.x = oX + fw + hwh;
    rWallDesc.translation.y = oY + hwh;
    rWallDesc.translation.z = oZ - hww;

    rWallDesc.setRotation(eulerToQuaternion({ x: 0, y: Math.PI / 2, z: 0 }));

    body.getRootMolecule()?.addAtom(world.createCollider(rWallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.boundary.type);

    // Bottom wall
    const bWallDesc = createBoundary();

    bWallDesc.translation.x = oX + hww;
    bWallDesc.translation.y = oY + hwh;
    bWallDesc.translation.z = oZ - fw - hwh;

    body.getRootMolecule()?.addAtom(world.createCollider(bWallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.boundary.type);

    // Left wall
    const lWallDesc = createBoundary();

    lWallDesc.translation.x = oX - hwh;
    lWallDesc.translation.y = oY + hwh;
    lWallDesc.translation.z = oZ - hww;

    lWallDesc.setRotation(eulerToQuaternion({ x: 0, y: Math.PI / 2, z: 0 }));

    body.getRootMolecule()?.addAtom(world.createCollider(lWallDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.boundary.type);
  }

  protected _addMazeExit(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.ATOMS.cell.size.w) / 2;

    const exitDesc = Rapier.ColliderDesc.cuboid(MazeBody.ATOMS.exit.size.l, MazeBody.ATOMS.exit.size.h, MazeBody.ATOMS.exit.size.w);
    const exitShape = exitDesc.shape as Rapier3D.Cuboid;

    exitDesc.translation.x = oX + offset;
    exitDesc.translation.y = oY + exitShape.halfExtents.y;
    exitDesc.translation.z = oZ - offset;

    body.getRootMolecule()?.addAtom(world.createCollider(exitDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.exit.type);
  }

  protected _addMazeHunterSpawn(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.ATOMS.cell.size.w) / 2;

    const hunterSpawnDesc = Rapier.ColliderDesc.cuboid(MazeBody.ATOMS.hunterSpawn.size.l, MazeBody.ATOMS.hunterSpawn.size.h, MazeBody.ATOMS.hunterSpawn.size.w);
    const hunterSpawnShape = hunterSpawnDesc.shape as Rapier3D.Cuboid;

    hunterSpawnDesc.translation.x = oX + offset;
    hunterSpawnDesc.translation.y = oY + hunterSpawnShape.halfExtents.y;
    hunterSpawnDesc.translation.z = oZ - offset;

    body.getRootMolecule()?.addAtom(world.createCollider(hunterSpawnDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.hunterSpawn.type);
  }

  protected _addMazePreySpawn(body: MazeBody, params: Required<CreateMazeParams>, cell: [number, number]) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const [oX, oY, oZ] = this._calcMazeCellOrigin(params, cell);
    const offset = (MazeBody.ATOMS.cell.size.w) / 2;

    const preySpawnDesc = Rapier.ColliderDesc.cuboid(MazeBody.ATOMS.preySpawn.size.l, MazeBody.ATOMS.preySpawn.size.h, MazeBody.ATOMS.preySpawn.size.w);
    const preySpawnShape = preySpawnDesc.shape as Rapier3D.Cuboid;

    preySpawnDesc.translation.x = oX + offset;
    preySpawnDesc.translation.y = oY + preySpawnShape.halfExtents.y;
    preySpawnDesc.translation.z = oZ - offset;

    body.getRootMolecule()?.addAtom(world.createCollider(preySpawnDesc, body.getRootMolecule()?.getBody()), MazeBody.ATOMS.preySpawn.type);
  }

  protected _calcFloorSize({ cells }: Required<CreateMazeParams>) {
    return MazeBody.ATOMS.cell.size.w * cells + MazeBody.ATOMS.wall.size.w * (cells - 1);
  }

  protected _calcWallSize(_: Required<CreateMazeParams>) {
    return [MazeBody.ATOMS.cell.size.w + MazeBody.ATOMS.wall.size.w, MazeBody.ATOMS.wall.size.h, MazeBody.ATOMS.wall.size.w];
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
