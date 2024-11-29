type IClass<I = unknown> = { new (...args: unknown[]): I };

export interface IServiceContainer {
  setByClass<I = unknown>(func: IClass<I>, instance: I): this;
  getByClass<I = unknown>(func: IClass<I>): I;
}

export class ServiceContainer implements IServiceContainer {
  private _map: Map<unknown, unknown>;

  private static _instances = new Map<string, IServiceContainer>();

  static instance(ctx = '') {
    let instance = this._instances.get(ctx);
    if (instance) return instance;

    instance = new this();
    this._instances.set(ctx, instance);

    return instance;
  }

  static clear(ctx = '') {
    this._instances.delete(ctx);
  }

  private constructor() {
    this._map = new Map();
  }

  setByClass<I = unknown>(func: IClass<I>, instance: I) {
    this._map.set(func.name, instance);
    return this;
  }

  getByClass<I = unknown>(func: IClass<I>) {
    const value = this._map.get(func.name);
    if (!value) throw new Error(`Could not find ${func.name} service`);
    return value as I;
  }
}
