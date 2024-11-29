import { IWithEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';
import { IGlobalState } from '@/src/modules/common/utils/threejs/global-state';

export interface ISimulation extends IWithEventProducer {
  init(): Promise<void>;
  start(): void;
  stop(): void;
  delete(): void;
  getState(): IGlobalState;
}

export interface ISimulationOptions {
  globalState: IGlobalState;
}

export class Simulation extends WithEventProducer(Function) implements ISimulation {
  private _globalState: IGlobalState;

  static get EVENTS() {
    return {
      delete: 'delete',
      tick: 'tick',
    };
  }

  static create(options: ISimulationOptions) {
    return new this(options);
  }

  constructor({ globalState }: ISimulationOptions) {
    super();
    this._globalState = globalState;
  }

  async init() {
    await this._globalState.scene?.init();
  }

  start() {
    this._globalState.clock.start();
    this._tick();
  }

  stop() {
    this._globalState.clock.stop();
  }

  delete() {
    this.emit(Simulation.EVENTS.delete, this);
    this._globalState.delete();
    this.removeAllListeners();
  }

  getState() {
    return this._globalState;
  }

  private _tick() {
    if (!this._globalState.clock.isRunning()) return;

    const tick = this._globalState.clock.tick();
    this.emit(Simulation.EVENTS.tick, tick, this);

    this._globalState.simulator.simulate(this._globalState, tick);

    this._globalState.renderer.render(this._globalState);

    this._globalState.window.requestAnimationFrame(this._tick.bind(this));
  }
}
