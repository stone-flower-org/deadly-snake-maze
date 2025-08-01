import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

import { SnakeHeadMolecule } from './snake-head-molecule';
import { SnakeTailMolecule } from './snake-tail-molecule';
import { SnakeBodyMolecule } from './snake-body-molecule';

export class SnakeBody extends BodyModel {
  static get MOLECULES() {
    return {
      head: {
        type: 'snake_head_molecule',
      },
      body: {
        type: 'snake_body_molecule',
      },
      tail: {
        type: 'snake_tail_molecule',
      },
    };
  };

  static get ATOMS() {
    return {
      head: {
        type: 'snake_head_atom',
        size: {
          // r: 0.2,
          r: 1,
        },
      },
      body: {
        type: 'snake_body_atom',
        size: {
          // r: 0.2,
          r: 1,
        },
      },
      tail: {
        type: 'snake_tail_atom',
        size: {
          // r: 0.2,
          r: 1,
        },
      },
    };
  };

  getHead() {
    return this.getRootMolecule() as SnakeHeadMolecule;
  }

  getBody() {
    return this.findMoleculeByType(SnakeBody.MOLECULES.body.type) as SnakeBodyMolecule;
  }

  getTail() {
    return this.findMoleculeByType(SnakeBody.MOLECULES.tail.type) as SnakeTailMolecule;
  }
}
