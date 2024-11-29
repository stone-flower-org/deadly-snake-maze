import { Cursor, ICursor } from '@/src/modules/common/utils/threejs/cursor';
import { IWithEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';
import { IRenderer } from '@/src/modules/common/utils/threejs/renderer';
import { IRenderableScene } from '@/src/modules/common/utils/threejs/scene';
import { IScreen, Screen } from '@/src/modules/common/utils/threejs/screen/screen';
import { ISimulator } from '@/src/modules/common/utils/threejs/simulator';
import { ITickingClock, TickingClock } from '@/src/modules/common/utils/threejs/time';

export interface IGlobalState extends IWithEventProducer {
  canvas: HTMLElement;
  clock: ITickingClock;
  cursor: ICursor;
  renderer: IRenderer;
  scene?: IRenderableScene;
  simulator: ISimulator;
  screen: IScreen;
  window: Window;
  setScene(scene: IRenderableScene): void;
  delete(): void;
}

export interface IGlobalStateOptions {
  canvas: HTMLElement;
  renderer: IRenderer;
  scene?: IRenderableScene;
  simulator: ISimulator;
  window: Window;
}

export class GlobalState extends WithEventProducer(Function) implements IGlobalState {
  scene?: IRenderableScene;
  readonly canvas: HTMLElement;
  readonly clock: ITickingClock;
  readonly cursor: ICursor;
  readonly renderer: IRenderer;
  readonly screen: IScreen;
  readonly simulator: ISimulator;
  readonly window: Window;

  static get EVENTS() {
    return {
      scenechange: 'scenechange',
    };
  }

  static create(options: IGlobalStateOptions) {
    return new this(options);
  }

  constructor({ canvas, renderer, scene, simulator, window }: IGlobalStateOptions) {
    super();
    this.canvas = canvas;
    this.clock = TickingClock.create();
    this.cursor = Cursor.create();
    this.renderer = renderer;
    this.scene = scene;
    this.simulator = simulator;
    this.screen = Screen.createFromDOM(window, canvas);
    this.window = window;
  }

  setScene(scene?: IRenderableScene) {
    this.scene?.delete();
    this.scene = scene;
    this.emit(GlobalState.EVENTS.scenechange, this.scene, this);
  }

  delete() {
    this.scene?.delete();
    this.clock.delete();
    this.cursor.delete();
    this.simulator.delete();
    this.renderer.delete();
    this.screen.delete();
    this.removeAllListeners();
  }
}
