import { type ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { AbstractUI } from '@/src/modules/deadly-maze-client/utils/ui/abstract-ui';

export class DebugUI extends AbstractUI {
  protected _axes: THREE.Object3D;

  static create() {
    return new this();
  }

  constructor() {
    super();

    const axes = new THREE.AxesHelper(1);
    this._axes = axes;
    axes.position.z -= 1;
    this._view.add(axes);
  }

  update(_: ITick): void {
    const quaternion = new THREE.Quaternion();
    this._axes.parent?.getWorldQuaternion(quaternion);
    if (quaternion) this._axes.setRotationFromQuaternion(quaternion.invert());
  }
}
