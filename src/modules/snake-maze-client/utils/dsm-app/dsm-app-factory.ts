import { ServiceProvider } from '@stone-flower-org/js-app';

import { IThreejsApp, Renderer } from '@/src/modules/common/utils/threejs';
import { DSMController } from '@/src/modules/snake-maze-client/utils/controllers';
import { DSMGameClientFactory } from '@/src/modules/snake-maze-client/utils/dsm-game-client';

import { DSMApp } from './dsm-app';
import { DSMSimulation } from './dsm-simulation';
import { DSMSimulationStore } from './dsm-simulation-store';

export interface DSMAppOptions {
  canvas: HTMLElement;
  window: Window;
}

export class DSMAppFactory {
  protected _gameClientFactory: DSMGameClientFactory;

  static create() {
    return new this();
  }

  constructor() {
    this._gameClientFactory = DSMGameClientFactory.create();
  }

  createDSMApp(options: DSMAppOptions) {
    const { canvas, window } = options;

    let app: DSMApp;
    // eslint-disable-next-line prefer-const
    app = new DSMApp({
      coreProviders: {
        canvas: ServiceProvider.create(canvas),
        renderer: ServiceProvider.createFromFunc(() => this.createThreejsRenderer(app, options)),
        simulation: ServiceProvider.createFromFunc(async () => {
          const simulation = this.createDSMSimulation(app, options);
          await simulation.boot();
          return simulation;
        }),
        window: ServiceProvider.create(window),
      },
    });

    return app;
  }

  createDSMSimulation(app: DSMApp, options: DSMAppOptions) {
    return new DSMSimulation({
      app,
      controller: new DSMController({ app }),
      gameClient: this._gameClientFactory.createDSMGameClient(app, options),
      store: new DSMSimulationStore({}),
    });
  }

  createThreejsRenderer(app: DSMApp, _: DSMAppOptions): Renderer {
    return Renderer.create({ app: app as IThreejsApp });
  }
}
