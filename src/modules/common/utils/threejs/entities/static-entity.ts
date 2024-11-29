import * as THREE from 'three';

import { AbstractEntity, IView } from '@/src/modules/common/utils/threejs/entity';

export interface IStaticEntityOptions<V extends IView> {
  view: V;
}

export class StaticEntity<V extends IView = IView> extends AbstractEntity<V> {
  protected _view: V;

  static createEntity<V extends THREE.Object3D>(options: IStaticEntityOptions<V>) {
    return new this(options);
  }

  protected constructor({ view }: IStaticEntityOptions<V>) {
    super();
    this._view = view;
  }

  getView(): V {
    return this._view;
  }
}
