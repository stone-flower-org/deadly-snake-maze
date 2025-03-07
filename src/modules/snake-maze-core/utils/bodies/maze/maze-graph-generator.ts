import { BidirectionalGraph, randomBetween, type GraphEdge } from '@stone-flower-org/js-utils';

import { DSMError } from '@/src/modules/snake-maze-core/utils/errors';

export type MazeGraphEdgeData = { wall: boolean };

export type MazeGraphNodeData = void;

export type MazeGraphEdge = GraphEdge<MazeGraphEdgeData>;

export type MazeGraphNode = GraphEdge<MazeGraphNodeData>;

export type MazeGraph = BidirectionalGraph<MazeGraphNodeData, MazeGraphEdgeData>;

export interface ICreateMazeGeneratorParams {
  xCells: number;
  yCells: number;
}

export class MazeGraphGenerator {
  generate(params: ICreateMazeGeneratorParams) {
    
    const { xCells, yCells } = params;
    if (xCells < 1 || yCells < 1) throw new DSMError(`xCells & yCells must be greater or equal to 1`);

    const mazeGraph = this._makeMazeGraph(params);

    this._randomizeWalls(params, mazeGraph);

    return mazeGraph;
  }

  protected _makeMazeGraph({ xCells, yCells }: ICreateMazeGeneratorParams) {
    const graph: MazeGraph = new BidirectionalGraph();

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

  _randomizeWalls(params: ICreateMazeGeneratorParams, graph: MazeGraph) {
    const transitions: [[number, number], [number, number]][] = [];
    const visited = new Set<string>();

    const edges = [...graph.getAllEdges()];
    const edge = edges[randomBetween(0, edges.length)];

    // Pick random edge as first transition
    const [x, y] = edge[0].split(',');
    const [nx, ny] = edge[1].split(',');
    transitions.push([[Number(x), Number(y)], [Number(nx), Number(ny)]]);

    while (transitions.length) {
      // Pick random transition
      const transition = transitions.splice(randomBetween(0, transitions.length - 1), 1)[0];
      const cell = transition[1];
      const cellKey = cell.join();

      if (visited.has(cellKey)) continue;
      visited.add(cellKey);

      // Remove wall from the edge
      const edge = graph.getEdge(transition[0].join(), cell.join());
      if (edge) edge[2].wall = false;

      this._getCellNeighbours(params, cell).forEach((nCell) => {
        transitions.push([cell, nCell]);
      });
    }
  }

  _getCellNeighbours({ xCells, yCells }: ICreateMazeGeneratorParams, [x, y]: [number, number]): [number, number][] {
    return [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ].reduce((res, [xOffest, yOffset]) => {
      const nx = x + xOffest;
      const ny = y + yOffset;

      if (nx >= 0 && nx < xCells && ny >= 0 && ny < yCells) res.push([nx, ny]);

      return res;
    }, [] as [number, number][]);
  }
}
