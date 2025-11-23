import { ITick, TouchedMap } from '@stone-flower-org/js-utils';

import { RapeirUtils } from '@/src/modules/common/utils/threejs';
import { AbstractBodyEntity } from '@/src/modules/deadly-maze-client/utils/entiteis/abstract-body-entity';
import { UnknownEntity } from '@/src/modules/deadly-maze-client/utils/entiteis/unknown-entity';
import { SceneRenderer } from '@/src/modules/deadly-maze-client/utils/scene-renderer';
import { BodyAtom, BodyModel, BodyMolecule } from '@/src/modules/deadly-maze-core/utils/store';

export type IFactoryResolver = (body: unknown) => (body: unknown) => AbstractBodyEntity;

export interface IBodySync {
  sync(tick: ITick, entity: AbstractBodyEntity, body: unknown): void;
}

export interface IBodySyncParams {
  sceneRenderer: SceneRenderer;
}

export abstract class AbstractBodySync implements IBodySync {
  protected _sceneRenderer: SceneRenderer;
  protected _updateState = new TouchedMap<number, AbstractBodyEntity>();

  constructor({ sceneRenderer }: IBodySyncParams) {
    this._sceneRenderer = sceneRenderer;
  }

  abstract sync(tick: ITick, entity: AbstractBodyEntity, body: unknown): void;
}

export class BodyModelSync extends AbstractBodySync {
  sync(tick: ITick, entity: AbstractBodyEntity, body: BodyModel) {
    this._updateState.touchAll(false);

    body.getMolecules().forEach((molecule) => {
      let childEntity = this._updateState.get(molecule.getId());

      if (!childEntity) {
        childEntity = this._sceneRenderer
          .getEntityMap()
          .resolveOrUse(
            molecule.getType() ?? '',
            UnknownEntity.ENTITIES.unknownMolecule,
          )(molecule);

        entity.getEntitiesCollection().addEntities([childEntity]);

        this._updateState.set(molecule.getId(), childEntity);
      }

      childEntity.updateFromBody(tick, molecule);

      this._updateState.touch(molecule.getId(), true);
    });

    this._updateState.forEachUntouched((uEntity) => {
      this._updateState.delete(uEntity.getBodyId());
      entity.getEntitiesCollection().deleteEntities([uEntity.id]);
    });
  }
}

export class BodyMoleculeSync extends AbstractBodySync {
  sync(tick: ITick, entity: AbstractBodyEntity, body: BodyMolecule) {
    RapeirUtils.instance().setViewPlacementFromRigidBody(entity.getView(), body.getBody());

    this._updateState.touchAll(false);

    body.getAtoms().forEach((atom) => {
      let childEntity = this._updateState.get(atom.getId());

      if (!childEntity) {
        childEntity = this._sceneRenderer
          .getEntityMap()
          .resolveOrUse(
            atom.getType() ?? '',
            UnknownEntity.ENTITIES.unknownAtom,
          )(atom);

        entity.getEntitiesCollection().addEntities([childEntity]);

        this._updateState.set(atom.getId(), childEntity);
      }

      childEntity.updateFromBody(tick, atom);

      this._updateState.touch(atom.getId(), true);
    });

    this._updateState.forEachUntouched((uEntity) => {
      this._updateState.delete(uEntity.getBodyId());
      entity.getEntitiesCollection().deleteEntities([uEntity.id]);
    });
  }
}

export class BodyAtomSync implements IBodySync {
  sync(_: ITick, entity: AbstractBodyEntity, body: BodyAtom) {
    RapeirUtils.instance().setViewPlacementFromCollider(entity.getView(), body.getCollider());
  }
}
