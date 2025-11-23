import { createContextSaver, type ITick } from '@stone-flower-org/js-utils';

import { AbstractSimulation, IControllerCollection } from '@/src/modules/common/utils/threejs';
import { DSMMainController } from '@/src/modules/deadly-maze-client/utils/controllers';
import { IDSMGameClient } from '@/src/modules/deadly-maze-client/utils/dsm-game-client';
import { DSMMainScene } from '@/src/modules/deadly-maze-client/utils/scenes';
import { DSMSimulationStore } from '@/src/modules/deadly-maze-client/utils/store';

import { DSMApp } from './dsm-app';

export interface DSMSimulationOptions {
  app: DSMApp;
  gameClient: IDSMGameClient;
  store: DSMSimulationStore;
  controller: DSMMainController;
}

export class DSMSimulation extends AbstractSimulation {
  protected _app: DSMApp;
  protected _gameClient: IDSMGameClient;
  protected _store: DSMSimulationStore;
  protected _controller: IControllerCollection;
  protected _binder = createContextSaver(this);

  constructor({ app, gameClient, store, controller }: DSMSimulationOptions) {
    super();
    this._app = app;
    this._gameClient = gameClient;
    this._store = store;
    this._controller = controller;
    this._app.getService('store').setScene(DSMMainScene.create({ app }));
  }

  getGameClient() {
    return this._gameClient;
  }

  getStore() {
    return this._store;
  }

  getContoller() {
    return this._controller;
  }

  async boot() {
    await this._gameClient.boot();
    this._app.on(DSMApp.EVENTS.boot, this._binder.useFunc(this.onAppBooted));
  }

  async onAppBooted() {
    await this._controller.init();
  }

  onTick(tick: ITick): void {
    this._gameClient.update(tick);
    this._app.getService('sceneRenderer').render(tick);
  }

  delete(): void {
    super.delete();
    this._app.off(DSMApp.EVENTS.boot, this._binder.useFunc(this.onAppBooted));
    this._controller.delete();
    this._gameClient.delete();
    this._store.delete();
  }
}
