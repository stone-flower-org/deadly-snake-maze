import * as THREE from 'three';

import { Rapier3D } from '@/src/modules/common/utils/rapier';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { UnknownEntity } from '@/src/modules/snake-maze-client/utils/entiteis/unknown-entity';
import { grassMaterial } from '@/src/modules/snake-maze-client/utils/materials';
import { IBodyUserData, MazeBody } from '@/src/modules/snake-maze-core/utils/bodies';
import { BodyModel } from '@/src/modules/snake-maze-core/utils/store';

export class MazeEntity extends AbstractBodyEntity {
  static get FLOOR() {
    return {
      polDensity: 5,
    };
  }

  static createFromBodyModel(model: BodyModel) {
    const userData = model.getBody().userData as IBodyUserData;

    const view = new THREE.Group();

    userData.map.forEach((type, i) => {
      if (type === MazeBody.BODIES.floor) {
        view.add(MazeEntity.createFloor(model.getBody().collider(i)));
        return;
      }
      // if (type === MazeBody.BODIES.wall) {
      //   view.add(MazeEntity.createWall(model.getBody().collider(i)));
      //   return;
      // }
      view.add(UnknownEntity.createFromCollider(model.getBody().collider(i)));
    });

    return new this({ view });
  }

  static createFloor(collider: Rapier3D.Collider) {
    const buboid = collider.shape as Rapier3D.Cuboid;

    const w = buboid.halfExtents.x * 2;
    const h = buboid.halfExtents.z * 2;

    const floorGeometry = new THREE.PlaneGeometry(
      w,
      h,
      w * MazeEntity.FLOOR.polDensity,
      h * MazeEntity.FLOOR.polDensity,
    );

    const floor = new THREE.Mesh(floorGeometry, grassMaterial);
    floor.position.y += buboid.halfExtents.y;

    return floor;
  }

  static createWall(collider: Rapier3D.Collider) {
    // TODO: write me
  }
}
