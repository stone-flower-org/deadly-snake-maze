import { type ITick, TouchedMap } from '@stone-flower-org/js-utils';

import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';
import { AbstractBodyEntity, ChickenEntity, MazeEntity, SnakeEntity, UnknownEntity } from '@/src/modules/snake-maze-client/utils/entiteis';
import { DSMMainScene } from '@/src/modules/snake-maze-client/utils/scenes';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { EntityMap } from './entity-map';

export interface ISceneRendererParams {
  app: DSMApp;
}

export class SceneRenderer {
  protected _app: DSMApp;
  protected _renderState = new TouchedMap<number, AbstractBodyEntity>();
  protected _entityMap = new EntityMap();

  constructor({ app }: ISceneRendererParams) {
    this._app = app;
    this._registerEntities();
  }

  getEntityMap() {
    return this._entityMap;
  }

  render(tick: ITick) {
    const scene = this._getCurrentScene();
    if (!scene) return;

    this._updateScene(tick, scene);
  }

  protected _getCurrentScene() {
    return this._app.getService('store').getScene() as DSMMainScene | undefined;
  }

  protected _getCurrentSpace() {
    let currentSpace: SpaceModel | undefined;

    try {
      currentSpace = this._app.getService('simulation').getStore().getSpace();
    } catch (_) {
      //
    }

    return currentSpace;
  }

  protected _updateScene(tick: ITick, scene: DSMMainScene) {
    const currentSpace = this._getCurrentSpace();

    this._renderState.touchAll(false);

    this._app
      .getService('simulation')
      .getStore()
      .getGameStore()
      .getAllSpaceBodies(currentSpace?.getId() ?? -1)
      .forEach((body) => {
        let entity = this._renderState.get(body.getId());

        if (!entity) {
          entity = this._entityMap.resolveOrUse(body.getType(), UnknownEntity.ENTITIES.unknownModel)(body);

          scene.getWorldEntity().getEntitiesCollection().addEntities([entity]);

          this._renderState.set(body.getId(), entity);
        }

        entity.updateFromBody(tick, body);

        this._renderState.touch(body.getId(), true);
      });

    this._renderState.forEachUntouched((entity, bodyId) => {
      this._renderState.delete(bodyId);
      scene.getWorldEntity().getEntitiesCollection().deleteEntities([entity.id]);
    });

    scene.update(tick);
  }

  protected _registerEntities() {
    UnknownEntity.registerEntity(this);
    ChickenEntity.registerEntity(this);
    MazeEntity.registerEntity(this);
    SnakeEntity.registerEntity(this);
  }
}
