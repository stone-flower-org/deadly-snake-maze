import { IAnimated } from '@/src/modules/common/utils/threejs/animated';

import { AbstractEntityCollection } from './abstract-entity-collection';
import { IEntity } from './entity';

export interface IEntityCollection<E extends IEntity = IEntity> extends IAnimated {
  readonly id: number;
  init(): Promise<void>;
  delete(): void;
  addEntities(controllers: E[]): void;
  removeEntities(ids: E['id'][]): void;
  deleteEntities(ids: E['id'][]): void;
  getEntities(ids: E['id'][]): E[];
  getAllEntities(): E[];
}

export interface IEntityCollectionOptions<E extends IEntity = IEntity> {
  entities?: E[];
}

export class EntityCollection<E extends IEntity = IEntity>
  extends AbstractEntityCollection<E>
  implements IEntityCollection<E> {}
