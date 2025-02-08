import { DSMError } from '@/src/modules/snake-maze-core/utils/errors';
import { AbstractSpaceManager } from '@/src/modules/snake-maze-core/utils/spaces/space';
import { IQueryFuncResult } from '@/src/modules/snake-maze-core/utils/store';

import { MazeSpace } from './maze-space';

export interface ICreateMazeSpace {
  cells?: number;
}

export class MazeSpaceManager extends AbstractSpaceManager<MazeSpace> {
  findMazeSpace() {
    const [mazeSpace] = this._app
      .getStore()
      .querySpaces((space) =>
        space.getState().type === MazeSpace.generateType() ? IQueryFuncResult.includeNExit : IQueryFuncResult.exclude,
      );
    if (!mazeSpace) throw new DSMError('Maze space is not found');
    return mazeSpace;
  }

  create({ cells }: ICreateMazeSpace) {
    const space = new MazeSpace({
      state: {
        id: MazeSpace.generateId(),
        type: MazeSpace.generateType(),
        world: this._createWorld(),
      },
    });

    this.save([space]);

    this._app.getService('mazeBodyManager').create({ space, cells });

    return space;
  }

  protected _createWorld() {
    return this._app.getService('physicsEngine').createWorld();
  }
}
