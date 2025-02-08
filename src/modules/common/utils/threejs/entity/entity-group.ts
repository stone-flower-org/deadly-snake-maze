import { type ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { AbstractEntity } from './abstract-entity';
import { IView } from './entity';
import { IEntityCollection } from './entity-collection';
import { EntityGroupCollection } from './entity-group-collection';

export class EntityGroup extends AbstractEntity {
  protected _view: IView;
  protected _entities: IEntityCollection;

  constructor() {
    super();
    this._view = new THREE.Group();
    this._entities = new EntityGroupCollection({ view: this._view });
  }

  getView() {
    return this._view;
  }

  update(tick: ITick): void {
    super.update(tick);
    this.getEntitiesCollection().update(tick);
  }

  getEntitiesCollection() {
    return this._entities;
  }

  clear() {
    this._entities.delete();
  }

  delete() {
    this.clear();
    super.delete();
  }
}
