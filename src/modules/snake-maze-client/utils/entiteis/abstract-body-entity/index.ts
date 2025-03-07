import { type ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { Rapier3D } from '@/src/modules/common/utils/rapier';
import { AbstractEntity, IView, Object3DUtils } from '@/src/modules/common/utils/threejs';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export interface IAbstractBodyEntityParams {
  view: IView;
}

export abstract class AbstractBodyEntity extends AbstractEntity {
  _view: IView;

  static setViewPlacementFromRigidBody(view: IView, body: Rapier3D.RigidBody) {
    const rotation = body.rotation();
    Object3DUtils.instance().setRotationFromQuanternionVec(
      view,
      new THREE.Vector4(rotation.x, rotation.y, -rotation.z, rotation.w),
    );

    const positions = body.translation();
    view.position.set(positions.x, positions.y, -positions.z);
  }

  static setViewPlacementFromCollider(view: IView, collider: Rapier3D.Collider) {
    const rotation = collider.rotation();
    Object3DUtils.instance().setRotationFromQuanternionVec(
      view,
      new THREE.Vector4(rotation.x, rotation.y, -rotation.z, rotation.w),
    );

    const positions = collider.translation();
    view.position.set(positions.x, positions.y, -positions.z);
  }

  constructor({ view }: IAbstractBodyEntityParams) {
    super();
    this._view = view;
  }

  getView() {
    return this._view;
  }

  updateFromBodyModel(_0: ITick, _1: BodyModel) {
    //
  }
}
