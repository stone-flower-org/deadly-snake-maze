import { type ITick, TouchedMap } from '@stone-flower-org/js-utils';

import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';
import { AbstractBodyEntity } from '@/src/modules/snake-maze-client/utils/entiteis';
import { DSMMainScene } from '@/src/modules/snake-maze-client/utils/scenes';
import { SpaceModel } from '@/src/modules/snake-maze-core/utils/store';

import { EntityFactory } from './entity-factory';

export interface ISceneRendererParams {
  app: DSMApp;
}

export class SceneRenderer {
  _app: DSMApp;
  _renderState = new TouchedMap<number, AbstractBodyEntity>();
  _entityFactory = new EntityFactory();

  constructor({ app }: ISceneRendererParams) {
    this._app = app;
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
          entity = this._entityFactory.createEntiryFromBodyModel(body);

          scene.getWorldEntity().getEntitiesCollection().addEntities([entity]);

          this._renderState.set(body.getId(), entity);
        }

        this._renderState.touch(body.getId(), true);

        entity.updateFromBodyModel(tick, body);
      });

    this._renderState.forEachUntouched((entity, bodyId) => {
      this._renderState.delete(bodyId);
      entity.delete();
    });

    scene.update(tick);
  }
}
