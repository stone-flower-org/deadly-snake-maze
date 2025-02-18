import { BidirectionalGraph, type GraphEdge, randomBetween } from '@stone-flower-org/js-utils';

import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { DSMError } from '@/src/modules/snake-maze-core/utils/errors';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { IMazeBodyUserData, MazeBody } from './maze-body';

// TODO: use randomized Prim's algorithm / Randomized Kruskal's algorithm
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
    rigidBody.userData = {
      map: [],
    };

    const mazeGraph = this._createMazeGraph(params);

    // Floor
    this._addFloorFromMazeGraph(rigidBody, mazeGraph, params);

    // Walls
    this._addWallsFromMazeGraph(rigidBody, mazeGraph, params);

    return rigidBody;
  }

  protected _createMazeGraph({ cells }: Required<CreateMazeParams>) {
    return this._mazeGraphGenerator.generate({ xCells: cells, yCells: cells });
  }

  protected _addFloorFromMazeGraph(
    rigidBody: PhysicsEngine.RigidBody,
    mazeGraph: MazeGraph,
    params: Required<CreateMazeParams>,
  ) {
    const { space } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const hfw = this._calcFloorSize(params) / 2;
    const hfh = MazeBody.FLOOR.h / 2;

    const floorShape = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    floorShape.translation.y -= hfh;

    world.createCollider(floorShape, rigidBody);

    (rigidBody.userData as IMazeBodyUserData).map.push(MazeBody.BODIES.floor);
  }

  protected _addWallsFromMazeGraph(
    rigidBody: PhysicsEngine.RigidBody,
    mazeGraph: MazeGraph,
    params: Required<CreateMazeParams>,
  ) {
    const { space, cells } = params;
    const Rapier = this._app.getService('physicsEngine').getRapier();
    const world = space.getWorld();

    const hwh = MazeBody.WALL.h / 2;
    const hww = MazeBody.WALL.w / 2;
    const hwl = (MazeBody.CELL.w * cells + MazeBody.WALL.w) / 2;

    const hfw = this._calcFloorSize(params) / 2;
    const offset = hww * 2;
    const oX = -hfw;
    const oY = -hfw;

    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const c = [x, y];
        const r = [x + 1, y];
        const b = [x, y + 1];

        // Right Wall
        // TODO: write me

        // Bottom Wall
        if (b[0] < cells && mazeGraph.getEdge(c.join(), b.join())?.[2].wall) {
          const floorShape = Rapier.ColliderDesc.cuboid(hwl, hwh, hfw);
          floorShape.translation.y += hwh;
          floorShape.translation.x = oX; // TODO: calculate me
          floorShape.translation.z += oY; // TODO: calculate me

          world.createCollider(floorShape, rigidBody);

          (rigidBody.userData as IMazeBodyUserData).map.push(MazeBody.BODIES.wall);
        }
      }
    }

    // const hfw = (MazeBody.CELL.w * mazeGraph.nodeSize + MazeBody.WALL.w * (mazeGraph.nodeSize + 1)) / 2;
    // const hfh = MazeBody.FLOOR.h / 2;

    // const floorShape = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    // floorShape.translation.y -= hfh;

    // world.createCollider(floorShape, rigidBody);

    // (rigidBody.userData as IMazeBodyUserData).map.push('floor');
  }

  _calcFloorSize({ cells }: Required<CreateMazeParams>) {
    return MazeBody.CELL.w * cells + MazeBody.WALL.w * (cells + 1);
  }
}

export type MazeGraphEdgeData = { wall: true };

export type MazeGraphNodeData = void;

export type MazeGraphEdge = GraphEdge<MazeGraphEdgeData>;

export type MazeGraphNode = GraphEdge<MazeGraphNodeData>;

export type MazeGraph = BidirectionalGraph<MazeGraphNodeData, MazeGraphEdgeData>;

export interface ICreateMazeGeneratorParams {
  xCells: number;
  yCells: number;
}

class MazeGraphGenerator {
  protected _makeMazeGraph({ xCells, yCells }: ICreateMazeGeneratorParams) {
    const graph: MazeGraph = new BidirectionalGraph();
    const weights = new Map();

    for (let y = 0; y < yCells; y++) {
      for (let x = 0; x < yCells; x++) {
        const c = [x, y];
        const r = [x + 1, y];
        const b = [x, y + 1];

        if (r[0] < xCells) graph.addEdge([c.join(), r.join(), { wall: true }]);

        if (b[0] < yCells) graph.addEdge([c.join(), b.join(), { wall: true }]);
      }
    }

    return graph;
  }

  generate(params: ICreateMazeGeneratorParams) {
    // TODO: write me
    const { xCells, yCells } = params;
    if (xCells < 1 || yCells < 1) throw new DSMError(`xCells & yCells must be greater or equal to 1`);

    const mazeGraph = this._makeMazeGraph(params);
    // const weights =

    return mazeGraph;

    // // Start at a random cell
    // const x = randomBetween(0, xCells);
    // const y = randomBetween(0, yCells);

    // const edges: MazeGraphEdge[] = [];
    // const rEdge = mazeGraph.getEdge(x, y);
    // edges.push(rEdge);

    // this.addFrontiers(x, y);

    // while (this.frontiers.length > 0) {
    //   const randIndex = Math.floor(Math.random() * this.frontiers.length);
    //   const [fx, fy, px, py] = this.frontiers.splice(randIndex, 1)[0];

    //   if (this.grid[fy][fx] === '#') {
    //     this.grid[fy][fx] = ' '; // Carve passage
    //     this.grid[py][px] = ' ';
    //     this.addFrontiers(fx, fy);
    //   }
    // }

    // return grid;
  }

  // addFrontiers(x, y) {
  //   [
  //     [0, -2],
  //     [0, 2],
  //     [-2, 0],
  //     [2, 0],
  //   ].forEach(([dx, dy]) => {
  //     const nx = x + dx,
  //       ny = y + dy;
  //     if (this.isInBounds(nx, ny) && this.grid[ny][nx] === '#') {
  //       this.frontiers.push([nx, ny, x + dx / 2, y + dy / 2]);
  //     }
  //   });
  // }

  // isInBounds(x, y) {
  //   return x >= 0 && y >= 0 && x < this.width && y < this.height;
  // }

  // printMaze() {
  //   console.log(this.grid.map((row) => row.join('')).join('\n'));
  // }
}
