import { WorldEntity } from '@/src/modules/deadly-maze-client/utils/entiteis/world-entity';
import { MainUI } from '@/src/modules/deadly-maze-client/utils/ui';

import { AbstractDSMScene, IDSMSceneOptions } from './abstract-dsm-scene';

export class DSMMainScene extends AbstractDSMScene {
  protected _ui: MainUI;
  protected _worldEntity: WorldEntity;

  static create(options: IDSMSceneOptions) {
    return new this(options);
  }

  constructor(options: IDSMSceneOptions) {
    super(options);

    this._ui = MainUI.create({ scene: this });

    this._worldEntity = WorldEntity.create({ scene: this });

    this.getEntitiesCollection().addEntities([this._ui, this._worldEntity]);
  }

  getUI() {
    return this._ui;
  }

  getWorldEntity() {
    return this._worldEntity;
  }
}
