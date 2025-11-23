export class AbstractCommand<P = unknown> {
  protected _payload: P;

  static create<P = unknown>(payload: P) {
    return new this(payload);
  }

  constructor(payload: P) {
    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  get name() {
    return this.constructor.name;
  }
}
