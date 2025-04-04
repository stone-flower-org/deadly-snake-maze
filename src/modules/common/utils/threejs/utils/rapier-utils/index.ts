import * as THREE from 'three';

import { IView } from '@/src/modules/common/utils/threejs/entity';
import { Object3DUtils } from '@/src/modules/common/utils/threejs/utils/object3d-utils';
import { Rapier3D } from '@/src/modules/common/utils/rapier';

// TODO: keep as part of the common modules
export class RapeirUtils {
  protected static _instance?: RapeirUtils;

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  setViewPlacementFromRigidBody(view: IView, body: Rapier3D.RigidBody) {
    const rotation = body.rotation();
    Object3DUtils.instance().setRotationFromQuanternionVec(
      view,
      new THREE.Vector4(rotation.x, rotation.y, -rotation.z, rotation.w),
    );

    const positions = body.translation();
    view.position.set(positions.x, positions.y, -positions.z);
  }

  setViewPlacementFromCollider(view: IView, collider: Rapier3D.Collider) {
    const rotation = collider.rotation();
    Object3DUtils.instance().setRotationFromQuanternionVec(
      view,
      new THREE.Vector4(rotation.x, rotation.y, -rotation.z, rotation.w),
    );

    const positions = collider.translation();
    view.position.set(positions.x, positions.y, -positions.z);
  }  
}
