export abstract class AbstractEvent<P> {
  _payload: P;

  constructor(payload: P) {
    this._payload = payload;
  }

  get name() {
    return this.constructor.name;
  }

  get payload() {
    return this._payload;
  }
}
