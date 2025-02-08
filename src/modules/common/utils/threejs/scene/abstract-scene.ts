import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { ICamera } from '@/src/modules/common/utils/threejs/camera';
import { EntityGroup, EntityGroupCollection } from '@/src/modules/common/utils/threejs/entity';

import { IScene, ISceneOptions } from './scene';

export abstract class AbstractScene<C extends ICamera = ICamera> extends EntityGroup implements IScene<C> {
  public readonly id: number;
  protected _entities: EntityGroupCollection;

  protected static _generateId = createAutoincrementIdGenerator();

  constructor({ entities, scene }: Partial<ISceneOptions> = {}) {
    super();
    this.id = this._generateId();
    this._view = scene ?? new THREE.Scene();
    this._entities = EntityGroupCollection.create({ entities, view: this.getView() });
  }

  async init() {
    //
  }

  getView() {
    return this._view;
  }

  abstract getCamera(): C | undefined;

  protected _generateId() {
    return AbstractScene._generateId();
  }
}
