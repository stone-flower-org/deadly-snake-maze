import { AbstractEntityCollection } from './abstract-entity-collection';
import { IEntity, IView } from './entity';
import { IEntityCollection, IEntityCollectionOptions } from './entity-collection';

export interface IEntityGroupCollectionParams extends IEntityCollectionOptions {
  view: IView;
}

export class EntityGroupCollection extends AbstractEntityCollection implements IEntityCollection {
  protected _view: IView;

  static create(options: IEntityGroupCollectionParams) {
    return new this(options);
  }

  constructor({ view, ...rest }: IEntityGroupCollectionParams) {
    super(rest);
    this._view = view;
  }

  addEntities(entities: IEntity[]) {
    entities.forEach((entity) => {
      super.addEntities([entity]);
      this._view.add(entity.getView());
    });
  }

  removeEntities(ids: number[]): void {
    ids.forEach((id) => {
      const entity = this.getEntities([id])[0];
      if (!entity) return;
      this._view.remove(entity.getView());
      super.removeEntities([id]);
    });
  }
}
