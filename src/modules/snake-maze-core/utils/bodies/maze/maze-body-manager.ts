import { Graph, GraphEdge, randomBetween } from '@stone-flower-org/js-utils';

import { AbstractBodyManager } from '@/src/modules/snake-maze-core/utils/bodies/body';
import { DSMError } from '@/src/modules/snake-maze-core/utils/errors';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { MazeBody } from './maze-body';

// TODO: use randomized Prim's algorithm / Randomized Kruskal's algorithm
export interface CreateMazeParams {
  space: SpaceModel;
  cells?: number;
  position?: PhysicsEngine.Vector3;
  rotation?: PhysicsEngine.Rotation;
}

export class MazeBodyManager extends AbstractBodyManager<MazeBody> {
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
    const { space, rotation, position, cells } = params;
    const world = space.getWorld();
    const Rapier = this._app.getService('physicsEngine').getRapier();

    const rigidBody = world.createRigidBody(Rapier.RigidBodyDesc.fixed());
    rigidBody.setRotation(rotation, false);
    rigidBody.setTranslation(position, false);

    const map: string[] = [];

    // Floor
    const hfw = (MazeBody.CELL.w * cells + MazeBody.WALL.w * (cells + 1)) / 2;
    const hfh = MazeBody.FLOOR.h / 2;
    const floorShape = Rapier.ColliderDesc.cuboid(hfw, hfh, hfw);
    floorShape.translation.y -= hfh;
    world.createCollider(floorShape, rigidBody);
    map.push('floor');

    // Walls

    rigidBody.userData = {
      map,
    };

    return rigidBody;
  }
}

export type MazeGraphEdgeData = { wall: true };

export type MazeGraphNodeData = void;

export type MazeGraphEdge = GraphEdge<MazeGraphEdgeData>;

export type MazeGraphNode = GraphEdge<MazeGraphNodeData>;

export type MazeGraph = Graph<MazeGraphNodeData, MazeGraphEdgeData>;

export interface ICreateMazeGeneratorParams {
  xCells: number;
  yCells: number;
}

class MazeGenerator {
  static get PARAMS() {
    return {
      cellSize: 3,
      wallSize: 1,
    };
  }

  protected _makeMazeGraph({ xCells, yCells }: ICreateMazeGeneratorParams) {
    const graph: MazeGraph = new Graph();
    const weights = new Map();

    for (let y = 0; y < yCells; y++) {
      for (let x = 0; x < yCells; x++) {
        const c = [x, y];
        const r = [x + 1, y];
        const d = [x, y + 1];

        if (r[0] < xCells) graph.addBidirectionalEdge([c.join(), r.join(), { wall: true }]);

        if (d[0] < yCells) graph.addBidirectionalEdge([c.join(), d.join(), { wall: true }]);
      }
    }

    return graph;
  }

  generate(params: ICreateMazeGeneratorParams) {
    // TODO: write me
    const { xCells, yCells } = params;
    if (xCells < 1 || yCells < 1) throw new DSMError(`xCells & yCells must be greater or equal to 1`);

    const mazeGraph = this._makeMazeGraph(params);
    const weights = 

    // Start at a random cell
    const x = randomBetween(0, xCells);
    const y = randomBetween(0, yCells);

    const edges: MazeGraphEdge[] = [];
    const rEdge = mazeGraph.getEdge(x, y);
    edges.push(rEdge);

    this.addFrontiers(x, y);

    while (this.frontiers.length > 0) {
      const randIndex = Math.floor(Math.random() * this.frontiers.length);
      const [fx, fy, px, py] = this.frontiers.splice(randIndex, 1)[0];

      if (this.grid[fy][fx] === '#') {
        this.grid[fy][fx] = ' '; // Carve passage
        this.grid[py][px] = ' ';
        this.addFrontiers(fx, fy);
      }
    }

    return grid;
  }

  addFrontiers(x, y) {
    [
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0],
    ].forEach(([dx, dy]) => {
      const nx = x + dx,
        ny = y + dy;
      if (this.isInBounds(nx, ny) && this.grid[ny][nx] === '#') {
        this.frontiers.push([nx, ny, x + dx / 2, y + dy / 2]);
      }
    });
  }

  isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  printMaze() {
    console.log(this.grid.map((row) => row.join('')).join('\n'));
  }
}

// Usage example:
const maze = new Maze(21, 21); // Must be odd-sized for proper passage creation
maze.generate();
maze.printMaze();
