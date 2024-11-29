import { IWithEventProducer, WithEventProducer } from '@/src/modules/common/utils/threejs/event-producer';

export interface IClock extends IWithEventProducer {
  isRunning(): boolean;
  getElapsedTime(): number;
  start(): void;
  stop(): void;
  continue(): void;
  delete(): void;
}

export class Clock extends WithEventProducer(Function) implements IClock {
  protected _isRunning = false;
  protected _startedAt = 0;
  protected _lastMeasureAt = 0;
  protected _elapsedTime = 0;

  static get EVENTS() {
    return {
      start: 'start',
      stop: 'stop',
      delete: 'delete',
      pause: 'pause',
      continue: 'continue',
    };
  }

  static create() {
    return new this();
  }

  isRunning() {
    return this._isRunning;
  }

  getElapsedTime() {
    if (!this._isRunning) return this._elapsedTime;

    const now = this._now();
    this._elapsedTime += now - this._lastMeasureAt;
    this._lastMeasureAt = now;

    return this._elapsedTime;
  }

  start() {
    this._isRunning = true;
    this._startedAt = this._now();
    this._lastMeasureAt = this._startedAt;
    this._elapsedTime = 0;
    this.emit(Clock.EVENTS.start, this);
  }

  stop() {
    this.getElapsedTime();
    this._isRunning = false;
    this.emit(Clock.EVENTS.stop, this);
  }

  continue() {
    this._isRunning = true;
    this._lastMeasureAt = this._now();
    this.emit(Clock.EVENTS.continue, this);
  }

  delete() {
    this.stop();
    this.emit(Clock.EVENTS.delete, this);
    this.removeAllListeners();
  }

  protected _now() {
    return Date.now();
  }
}
