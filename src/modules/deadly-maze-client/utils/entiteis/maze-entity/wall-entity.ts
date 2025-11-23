import { ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { Rapier3D } from '@/src/modules/common/utils/rapier';
import { AbstractBodyEntity } from '@/src/modules/deadly-maze-client/utils/entiteis/abstract-body-entity';
import { BodyAtomSync } from '@/src/modules/deadly-maze-client/utils/entiteis/utils';
import { unknownMaterial } from '@/src/modules/deadly-maze-client/utils/materials';
import { SceneRenderer } from '@/src/modules/deadly-maze-client/utils/scene-renderer';
import { BodyAtom } from '@/src/modules/deadly-maze-core/utils/store';

export class WallEntity extends AbstractBodyEntity<BodyAtom> {
  protected _sync = new BodyAtomSync();

  static get OPTIONS() {
    return {
      geometry: {
        segmentsDensity: 5,
      },
    };
  }

  static factory(_: SceneRenderer) {
    let geometry: THREE.PlaneGeometry | undefined;

    return (atom: BodyAtom) => {
      const сuboid = atom.getCollider().shape as Rapier3D.Cuboid;

      const w = сuboid.halfExtents.x * 2;
      const h = сuboid.halfExtents.y * 2;
      const d = сuboid.halfExtents.z * 2;

      if (!geometry) {
        geometry = new THREE.BoxGeometry(
          w,
          h,
          d,
          w * WallEntity.OPTIONS.geometry.segmentsDensity,
          h * WallEntity.OPTIONS.geometry.segmentsDensity,
          d * WallEntity.OPTIONS.geometry.segmentsDensity,
        );
      }

      const view = new THREE.Mesh(geometry, unknownMaterial); // TODO: delete me

      return new WallEntity({ bodyId: atom.getId(), view });
    };
  }

  updateFromBody(tick: ITick, body: BodyAtom): void {
    this._sync.sync(tick, this, body);
  }
}
