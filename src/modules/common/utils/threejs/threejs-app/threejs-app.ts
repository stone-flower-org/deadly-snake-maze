import {
  App,
  ServiceProvider,
  type IDefaultContainerServices,
  type IValidContainerServices,
  type IServiceProvider,
  type IAppOptions,
} from '@stone-flower-org/js-app';
import { Clock, WithEventProducer, type IWithEventProducer } from '@stone-flower-org/js-utils';

import { IRenderer, Renderer } from '@/src/modules/common/utils/threejs/renderer';
import { ISimulation } from '@/src/modules/common/utils/threejs/simulation';
import { IThreejsStore, ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';

import { IThreejsServices } from './threejs-services';

export interface IThreejsApp<
  S extends IValidContainerServices = IDefaultContainerServices,
  AS extends IThreejsServices<S> = IThreejsServices<S>,
> extends App<AS>,
    IWithEventProducer {
  stop(): void;
  delete(): void;
}

export type IThreejsAppOptions = {
  coreProviders: {
    canvas: IServiceProvider<HTMLElement>;
    renderer?: IServiceProvider<IRenderer>;
    simulation: IServiceProvider<ISimulation>;
    store?: IServiceProvider<IThreejsStore>;
    window: IServiceProvider<Window>;
  };
};

export class ThreejsApp<
    S extends IValidContainerServices = IDefaultContainerServices,
    TS extends IThreejsServices<S> = IThreejsServices<S>,
  >
  extends WithEventProducer(App)<TS>
  implements IThreejsApp<TS>
{
  static get EVENTS() {
    return {
      delete: 'delete',
    };
  }

  constructor(options: IThreejsAppOptions) {
    super(undefined, {
      ...options,
      coreProviders: {
        ...options.coreProviders,
        clock: ServiceProvider.create(Clock.create()),
        store: options.coreProviders.store ?? ServiceProvider.create(ThreejsStore.create()),
      },
    } as IAppOptions<TS>);

    this._initCoreProviders(options);
  }

  async start() {
    await super.start();
    this.getService('clock').start();
    this._tick();
  }

  stop() {
    this.getService('clock').stop();
  }

  delete() {
    this.getService('simulation').delete();
    this.getService('renderer').delete();
    this.getService('store').delete();
    this.getService('clock').delete();
    this._eventBus.emit(ThreejsApp.EVENTS.delete, this);
    this.removeAllListeners();
  }

  protected _tick() {
    const clock = this.getService('clock');

    if (!clock.isRunning()) return;

    const tick = clock.tick();

    this.getService('simulation').update(tick);

    this.getService('renderer').render(tick);

    this.getService('window').requestAnimationFrame(this._tick.bind(this));
  }

  protected _initCoreProviders(options: IThreejsAppOptions) {
    if (!options.coreProviders.renderer) {
      this.registerProvider('renderer', ServiceProvider.create(Renderer.create({ app: this as ThreejsApp })));
    }
  }
}
