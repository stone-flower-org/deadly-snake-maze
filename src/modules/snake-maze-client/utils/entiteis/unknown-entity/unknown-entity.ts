import { ITick } from '@stone-flower-org/js-utils';
import * as THREE from 'three';

import { getCubeFromShapeSafe } from '@/src/modules/common/utils/rapier';
import { AbstractBodyEntity, IAbstractBodyEntityParams } from '@/src/modules/snake-maze-client/utils/entiteis/abstract-body-entity';
import { BodyAtom, BodyModel, BodyMolecule } from '@/src/modules/snake-maze-core/utils/store';
import { unknownGeometry } from '@/src/modules/snake-maze-client/utils/geometries';
import { unknownMaterial } from '@/src/modules/snake-maze-client/utils/materials';
import { BodyAtomSync, BodyModelSync, BodyMoleculeSync, IBodySync } from '@/src/modules/snake-maze-client/utils/entiteis/utils';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';

export interface IUnknownEntityParams extends IAbstractBodyEntityParams {
  sync: IBodySync;
}

export class UnknownEntity extends AbstractBodyEntity {
  protected _sync: IUnknownEntityParams['sync'];

  static get ENTITIES() {
    return {
      unknownAtom: 'unknownAtom',
      unknownModel: 'unknownModel',
      unknownMolecule: 'unknownMolecule',
    };
  }

  static registerEntity(sceneRenderer: SceneRenderer) {
    sceneRenderer.getEntityMap().set(
      this.ENTITIES.unknownAtom,
      (body: BodyAtom) => {
        const collider = body.getCollider();
        const size = getCubeFromShapeSafe(collider.shape, [1, 1, 1]);
    
        const view = new THREE.Mesh(unknownGeometry, unknownMaterial);
        view.scale.set(size[0], size[1], size[2]);
    
        return new UnknownEntity({ bodyId: body.getId(), view, sync: new BodyAtomSync() });
      }
    )
    .set(
      this.ENTITIES.unknownModel,
      (body: BodyModel) => new UnknownEntity({ bodyId: body.getId(), view: new THREE.Group(), sync: new BodyModelSync({ sceneRenderer }) })
    )
    .set(
      this.ENTITIES.unknownMolecule,
      (body: BodyMolecule) => new UnknownEntity({ bodyId: body.getId(), view: new THREE.Group(), sync: new BodyMoleculeSync({ sceneRenderer }) })
    )
  }

  constructor({ sync, ...rest }: IUnknownEntityParams) {
    super(rest);
    this._sync = sync
  }

  updateFromBody(tick: ITick, body: unknown): void {
    this._sync.sync(tick, this, body);
  }
}
