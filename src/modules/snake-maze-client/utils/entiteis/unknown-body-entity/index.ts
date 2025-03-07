import * as THREE from 'three';

import { forEachColliderFromRigidBody, getCubeFromShapeSafe } from '@/src/modules/common/utils/rapier';
import { IView } from '@/src/modules/common/utils/threejs';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { unknownGeometry } from '@/src/modules/snake-maze-client/utils/geometries';
import { unknownMaterial } from '@/src/modules/snake-maze-client/utils/materials';
import { PhysicsEngine } from '@/src/modules/snake-maze-core/utils/physics-engine';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export interface IUnknownBodyEntityParams {
  view: IView;
}

export class UnknownBodyEntity extends AbstractBodyEntity {
  static createFromBodyModel(body: BodyModel) {
    return this.createFromRigidBody(body.getBody());
  }

  static createFromRigidBody(body: PhysicsEngine.RigidBody) {
    const view = new THREE.Group();

    forEachColliderFromRigidBody(body, (collider) => {
      view.add(this.createFromCollider(collider));
    });

    AbstractBodyEntity.setViewPlacementFromRigidBody(view, body);

    return new this({ view });
  }

  static createFromCollider(collider: PhysicsEngine.Collider) {
    const view = new THREE.Mesh(unknownGeometry, unknownMaterial);

    AbstractBodyEntity.setViewPlacementFromCollider(view, collider);

    const size = getCubeFromShapeSafe(collider.shape, [1, 1, 1]);
    view.scale.set(size[0], size[1], size[2]);

    return new this({ view }).getView();
  }
}
