import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export class SnakeHeadBody extends BodyModel {
  static get MOLECULES() {
    return {
      head: {
        type: 'snake_head',
        size: {
          w: 0.2,
          l: 0.2,
          h: 0.2,
        },
      },
    };
  };

  static get ATOMS() {
    return {
      root: {
        type: 'snake_head_root',
      },
    };
  };
}
