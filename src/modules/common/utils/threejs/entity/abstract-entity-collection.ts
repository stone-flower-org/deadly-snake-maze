import { createAutoincrementIdGenerator, createContextSaver } from '@stone-flower-org/js-utils';

import { ITick } from '@/src/modules/common/utils/threejs/time';
import { Collection, ICollection } from '@/src/modules/common/utils/threejs/utils';

import { AbstractEntity } from './abstract-entity';
import { IEntity } from './entity';
import { IEntityCollection, IEntityCollectionOptions } from './entity-collection';

export class AbstractEntityCollection<E extends IEntity = IEntity> implements IEntityCollection<E> {
  public readonly id: number;
  protected _entities: ICollection<E, E['id']>;
  private _binder = createContextSaver(this);

  protected static generateId = createAutoincrementIdGenerator();

  constructor({ entities }: IEntityCollectionOptions<E> = {}) {
    this.id = this._generateId();
    this._entities = new Collection<E, E['id']>({
      idGetter: (item: E) => item.id,
      items: entities,
    });
  }

  addEntities(entities: E[]) {
    entities.forEach((entity) => {
      entity.on(AbstractEntity.EVENTS.delete, this._binder.useFunc(this._onEntityDelete));
      this._entities.add([entity]);
    });
  }

  removeEntities(ids: E['id'][]): void {
    ids.forEach((id) => {
      const entity = this._entities.get([id])[0];
      if (!entity) return;
      entity.off(AbstractEntity.EVENTS.delete, this._binder.useFunc(this._onEntityDelete));
      this._entities.delete([id]);
    });
  }

  deleteEntities(ids: E['id'][]) {
    ids.forEach((id) => {
      const entity = this._entities.get([id])[0];
      if (!entity) return;
      entity.delete();
    });
  }

  getEntities(ids: E['id'][]) {
    return this._entities.get(ids);
  }

  getAllEntities() {
    return this._entities.getAll();
  }

  async init() {
    await Promise.all(this.getAllEntities().map((entity) => entity.init()));
  }

  update(tick: ITick) {
    this.getAllEntities().forEach((entity) => entity.update(tick));
  }

  delete() {
    this.deleteEntities(this.getAllEntities().map((item) => item.id));
  }

  protected _onEntityDelete(entity: E) {
    this.removeEntities([entity.id]);
  }

  protected _generateId() {
    return AbstractEntityCollection.generateId();
  }
}
