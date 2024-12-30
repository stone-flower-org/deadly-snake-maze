import { type IWithEventProducer, WithEventProducer } from '@stone-flower-org/js-utils';

import { IThreejsCtx } from '@/src/modules/common/utils/threejs/threejs-ctx';

export interface IThreejsApp extends IWithEventProducer {
  boot(): Promise<void>;
  start(): void;
  stop(): void;
  delete(): void;
}

export interface IThreejsAppOptions {
  ctx: IThreejsCtx;
}

export class ThreejsApp extends WithEventProducer(Function) implements IThreejsApp {
  private _ctx: IThreejsCtx;

  static get EVENTS() {
    return {
      delete: 'delete',
    };
  }

  static create(options: IThreejsAppOptions) {
    return new this(options);
  }

  constructor({ ctx }: IThreejsAppOptions) {
    super();
    this._ctx = ctx;
  }

  async boot() {
    await this._ctx.renderer.boot(this._ctx);
    await this._ctx.simulation.boot(this._ctx);
  }

  start() {
    this._ctx.clock.start();
    this._tick();
  }

  stop() {
    this._ctx.clock.stop();
  }

  delete() {
    this._eventBus.emit(ThreejsApp.EVENTS.delete, this);
    this._ctx.delete();
    this.removeAllListeners();
  }

  getCtx() {
    return this._ctx;
  }

  private _tick() {
    if (!this._ctx.clock.isRunning()) return;

    const tick = this._ctx.clock.tick();

    this._ctx.simulation.update(tick);

    this._ctx.renderer.render(tick);

    this._ctx.window.requestAnimationFrame(this._tick.bind(this));
  }
}
