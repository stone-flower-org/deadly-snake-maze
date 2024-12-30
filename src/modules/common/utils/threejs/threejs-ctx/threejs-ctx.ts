import { type ITickingClock, TickingClock } from '@stone-flower-org/js-utils';

import { IRenderer } from '@/src/modules/common/utils/threejs/renderer';
import { ISimulation } from '@/src/modules/common/utils/threejs/simulation';
import { IThreejsStore, ThreejsStore } from '@/src/modules/common/utils/threejs/threejs-store';
import { Screen } from '@/src/modules/common/utils/threejs/threejs-store/screen/screen';

export interface IThreejsCtx {
  clock: ITickingClock;
  renderer: IRenderer;
  window: Window;
  canvas: HTMLElement;
  simulation: ISimulation;
  store: IThreejsStore;
  delete(): void;
}

export interface IThreejsCtxOptions {
  canvas: HTMLElement;
  renderer: IRenderer;
  simulation: ISimulation;
  window: Window;
}

export class ThreejsCtx implements IThreejsCtx {
  readonly canvas: HTMLElement;
  readonly clock: ITickingClock;
  readonly renderer: IRenderer;
  readonly window: Window;
  readonly store: IThreejsStore;
  readonly simulation: ISimulation;

  static create(options: IThreejsCtxOptions) {
    return new this(options);
  }

  constructor({ canvas, renderer, simulation, window }: IThreejsCtxOptions) {
    this.canvas = canvas;
    this.clock = TickingClock.create();
    this.renderer = renderer;
    this.simulation = simulation;
    this.store = ThreejsStore.create({
      screen: Screen.createFromDOM(window, canvas),
    });
    this.window = window;
  }

  delete() {
    this.simulation.delete();
    this.renderer.delete();
    this.store.delete();
    this.clock.delete();
  }
}
