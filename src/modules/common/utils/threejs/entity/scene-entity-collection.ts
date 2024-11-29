import { IScene } from '@/src/modules/common/utils/threejs/scene';

import { AbstractEntityCollection } from './abstract-entity-collection';
import { IEntity } from './entity';
import { IEntityCollection, IEntityCollectionOptions } from './entity-collection';

export interface ISceneEntityCollectionOptions extends IEntityCollectionOptions {
  scene: IScene;
}

export class SceneEntityCollection extends AbstractEntityCollection implements IEntityCollection {
  protected _scene: IScene;

  static create(options: ISceneEntityCollectionOptions) {
    return new this(options);
  }

  constructor({ scene, ...rest }: ISceneEntityCollectionOptions) {
    super(rest);
    this._scene = scene;
  }

  addEntities(entities: IEntity[]) {
    entities.forEach((entity) => {
      super.addEntities([entity]);
      this._scene.getView().add(entity.getView());
    });
  }

  removeEntities(ids: number[]): void {
    ids.forEach((id) => {
      const entity = this.getEntities([id])[0];
      if (!entity) return;
      this._scene.getView().remove(entity.getView());
      super.removeEntities([id]);
    });
  }
}
