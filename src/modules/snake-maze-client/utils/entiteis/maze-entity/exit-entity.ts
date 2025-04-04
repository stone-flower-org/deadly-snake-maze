import { ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { Rapier3D } from "@/src/modules/common/utils/rapier";
import { unknownMaterial } from '@/src/modules/snake-maze-client/utils/materials';
import { BodyAtom } from '@/src/modules/snake-maze-core/utils/store';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';
import { BodyAtomSync } from '@/src/modules/snake-maze-client/utils/entiteis/utils';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';

export class ExitEntity extends AbstractBodyEntity<BodyAtom> {
  protected _sync = new BodyAtomSync();

  static get OPTIONS() {
    return {
      geometry: {
        segmentsDensity: 5,
      }
    };
  }

  static factory(_: SceneRenderer) {
    let geometry: THREE.BoxGeometry | undefined;

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
          w * ExitEntity.OPTIONS.geometry.segmentsDensity,
          h * ExitEntity.OPTIONS.geometry.segmentsDensity,
          d * ExitEntity.OPTIONS.geometry.segmentsDensity,
        );
      }

      const view = new THREE.Mesh(geometry, unknownMaterial); // TODO: delete me

      return new ExitEntity({ bodyId: atom.getId(), view });
    };
  }

  updateFromBody(tick: ITick, body: BodyAtom): void {
    this._sync.sync(tick, this, body);
  }
}
