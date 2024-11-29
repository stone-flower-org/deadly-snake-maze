import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { ICamera } from '@/src/modules/common/utils/threejs/camera';
import { SceneEntityCollection } from '@/src/modules/common/utils/threejs/entity';
import { ITick } from '@/src/modules/common/utils/threejs/time';
import { Object3DUtils } from '@/src/modules/common/utils/threejs/utils';

import { IScene, ISceneOptions, ISceneView } from './scene';

export abstract class AbstractScene<C extends ICamera = ICamera> implements IScene<C> {
  public readonly id: number;
  protected _entities: SceneEntityCollection;
  protected _scene: ISceneView;

  protected static _generateId = createAutoincrementIdGenerator();

  constructor({ entities, scene }: Partial<ISceneOptions> = {}) {
    this.id = this._generateId();
    this._scene = scene ?? new THREE.Scene();
    this._entities = SceneEntityCollection.create({ entities, scene: this });
  }

  async init() {
    //
  }

  getView() {
    return this._scene;
  }

  getEntitiesCollection() {
    return this._entities;
  }

  update(tick: ITick) {
    this._entities.update(tick);
  }

  clear() {
    this._entities.delete();
  }

  delete() {
    this.clear();
    Object3DUtils.instance().deleteObject(this._scene);
  }

  abstract getCamera(): C | undefined;

  protected _generateId() {
    return AbstractScene._generateId();
  }
}
