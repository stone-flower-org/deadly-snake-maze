import { type ITick } from '@stone-flower-org/js-utils';

import { AbstractSimulation, IControllerCollection } from '@/src/modules/common/utils/threejs';
import { DSMController } from '@/src/modules/snake-maze-client/utils/controllers';
import { IDSMGameClient } from '@/src/modules/snake-maze-client/utils/dsm-game-client';

import { DSMApp } from './dsm-app';
import { DSMSimulationStore } from './dsm-simulation-store';

export interface DSMSimulationOptions {
  app: DSMApp;
  gameClient: IDSMGameClient;
  store: DSMSimulationStore;
  controller: DSMController;
}

export class DSMSimulation extends AbstractSimulation {
  protected _app: DSMApp;
  protected _gameClient: IDSMGameClient;
  protected _store: DSMSimulationStore;
  protected _controller: IControllerCollection;

  constructor({ app, gameClient, store, controller }: DSMSimulationOptions) {
    super();
    this._app = app;
    this._gameClient = gameClient;
    this._store = store;
    this._controller = controller;
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
    await this._controller.init();
    await this._gameClient.boot();
  }

  onTick(tick: ITick): void {
    this._gameClient.update(tick);
    this._app.getService('store').getScene()?.update(tick);
  }

  delete(): void {
    super.delete();
    this._controller.delete();
    this._gameClient.delete();
    this._store.delete();
  }
}
