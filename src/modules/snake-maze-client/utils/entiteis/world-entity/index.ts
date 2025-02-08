import { EntityGroup } from '@/src/modules/common/utils/threejs';
import { DSMMainScene } from '@/src/modules/snake-maze-client/utils/scenes';

export interface IWorldEntityParams {
  scene: DSMMainScene;
}

export class WorldEntity extends EntityGroup {
  _scene: DSMMainScene;

  static create(params: IWorldEntityParams) {
    return new this(params);
  }

  constructor({ scene }: IWorldEntityParams) {
    super();
    this._scene = scene;
  }

  getScene() {
    return this._scene;
  }
}
