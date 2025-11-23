import { BodyModel, IRigidBodyUserData } from '@/src/modules/deadly-maze-core/utils/store';

export type IMazeBodyUserData = IRigidBodyUserData;

export class MazeBody extends BodyModel {
  static get ATOMS() {
    return {
      cell: {
        type: 'maze_cell',
        size: {
          w: 5,
        },
      },
      floor: {
        type: 'maze_floor',
        size: {
          h: 0.1,
        },
      },
      wall: {
        type: 'maze_wall',
        size: {
          w: 1,
          h: 1,
        },
      },
      boundary: {
        type: 'maze_boundary',
        size: {
          w: 1,
          h: 1,
        },
      },
      exit: {
        type: 'maze_exit',
        size: {
          l: 1,
          w: 1,
          h: 0.1,
        },
      },
      hunterSpawn: {
        type: 'maze_hunterSpawn',
        size: {
          l: 1,
          w: 1,
          h: 0.1,
        },
      },
      preySpawn: {
        type: 'maze_preySpawn',
        size: {
          l: 1,
          w: 1,
          h: 0.1,
        },
      },
    };
  }

  static get MOLECULES() {
    return {
      root: {
        type: 'maze_root_molecule',
        size: {
          w: 5,
        },
      },
    };
  }

  getExit() {
    return this.getRootMolecule()?.findAtomByType(MazeBody.ATOMS.exit.type);
  }

  getPreySpawn() {
    return this.getRootMolecule()?.findAtomByType(MazeBody.ATOMS.exit.type);
  }

  getHunterSpawn() {
    return this.getRootMolecule()?.findAtomByType(MazeBody.ATOMS.hunterSpawn.type);
  }
}
