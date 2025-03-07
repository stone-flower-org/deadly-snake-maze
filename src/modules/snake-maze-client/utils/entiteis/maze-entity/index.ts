import * as THREE from 'three';

import { Rapier3D } from '@/src/modules/common/utils/rapier';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { UnknownBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/unknown-body-entity';
import { grassMaterial, unknownMaterial } from '@/src/modules/snake-maze-client/utils/materials';
import { MazeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export class MazeEntity extends AbstractBodyEntity {
  static get FLOOR() {
    return {
      polDensity: 5,
    };
  }

  static createFromBodyModel(model: BodyModel) {
    const view = new THREE.Group();

    AbstractBodyEntity.setViewPlacementFromRigidBody(view, model.getBody());

    model.getUserData().bodyParts.forEach((type, i) => {
      if (type === MazeBody.BODY_PARTS.floor) {
        view.add(MazeEntity.createFloor(model.getBody().collider(i)));
        return;
      }
      // if (type === MazeBody.BODY_PARTS.wall) {
      //   view.add(MazeEntity.createWall(model.getBody().collider(i)));
      //   return;
      // }
      view.add(UnknownBodyEntity.createFromCollider(model.getBody().collider(i)));
    });

    return new this({ view });
  }

  static createFloor(collider: Rapier3D.Collider) {
    const buboid = collider.shape as Rapier3D.Cuboid;

    const w = buboid.halfExtents.x * 2;
    const d = buboid.halfExtents.z * 2;

    const floorGeometry = new THREE.PlaneGeometry(
      w,
      d,
      w * MazeEntity.FLOOR.polDensity,
      d * MazeEntity.FLOOR.polDensity,
    );

    // const floor = new THREE.Mesh(floorGeometry, grassMaterial); // TODO: uncomment me
    const floor = new THREE.Mesh(floorGeometry, unknownMaterial); // TODO: delete me

    AbstractBodyEntity.setViewPlacementFromCollider(floor, collider);
    floor.position.y += buboid.halfExtents.y;

    return floor;
  }

  static createWall(collider: Rapier3D.Collider) {
    // TODO: write me
  }
}
