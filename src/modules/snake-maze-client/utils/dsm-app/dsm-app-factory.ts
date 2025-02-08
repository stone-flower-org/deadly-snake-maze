import { ServiceProvider } from '@stone-flower-org/js-app';

import { IThreejsApp, Renderer } from '@/src/modules/common/utils/threejs';
import { DSMMainController } from '@/src/modules/snake-maze-client/utils/controllers';
import { DSMGameClientFactory } from '@/src/modules/snake-maze-client/utils/dsm-game-client';
import { SceneRenderer } from '@/src/modules/snake-maze-client/utils/scene-renderer';
import {
  IDSMSimulationState,
  DSMSimulationStore,
  initialDSMSimulationState,
} from '@/src/modules/snake-maze-client/utils/store';

import { DSMApp } from './dsm-app';
import { DSMSimulation } from './dsm-simulation';

export interface DSMAppOptions {
  canvas: HTMLElement;
  window: Window;
  configs?: {
    clientState?: IDSMSimulationState;
  };
}

export const defaultDSMAppOptions = {
  configs: {
    clientState: initialDSMSimulationState,
  },
};

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

    this.registerServiceProviders(app, options);

    return app;
  }

  createDSMSimulation(app: DSMApp, options: DSMAppOptions) {
    const gameClient = this._gameClientFactory.createDSMGameClient(app, options);
    return new DSMSimulation({
      app,
      controller: new DSMMainController({ app }),
      gameClient,
      store: new DSMSimulationStore(
        options.configs?.clientState ?? defaultDSMAppOptions.configs.clientState,
        gameClient.getStore(),
      ),
    });
  }

  createThreejsRenderer(app: DSMApp, { canvas }: DSMAppOptions): Renderer {
    return Renderer.create({
      antialias: true,
      app: app as IThreejsApp,
      canvas,
    });
  }

  registerServiceProviders(app: DSMApp, _: DSMAppOptions) {
    app.registerProvider(
      'sceneRenderer',
      ServiceProvider.createFromFunc(() => new SceneRenderer({ app })),
    );
  }
}
