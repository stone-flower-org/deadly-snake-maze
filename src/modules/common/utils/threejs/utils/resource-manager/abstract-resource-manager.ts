import { ICommonResource, ITypedCommonResource } from './resource';
import { IResourceManager, IResourceMap } from './resource-manager';

export abstract class AbstractResourceManager<M extends IResourceMap> implements IResourceManager<M> {
  protected _cache: Map<string, M[keyof M]>;

  constructor() {
    this._cache = new Map();
  }

  async load<T extends keyof M = keyof M>(resource: ITypedCommonResource<T>): Promise<M[T]> {
    const cacheKey = this._cacheKey(resource);

    let file = this._cache.get(cacheKey) as M[T] | undefined;
    if (file) return Promise.resolve(file);

    file = await this.loadResource(resource);

    if (!file) throw new Error(`Unknown ${resource.type} resource type`);

    this._cache.set(cacheKey, file);

    return file;
  }

  loadAll<P extends ICommonResource[], R extends Promise<{ -readonly [K in keyof P]: Awaited<M[P[K]['type']]> }>>(
    resources: P,
  ): R {
    return Promise.all(resources.map((resource) => this.load(resource))) as R;
  }

  clear(resource: ICommonResource) {
    this._cache.delete(this._cacheKey(resource));
  }

  clearAll() {
    this._cache.clear();
  }

  abstract loadResource<T extends keyof M = keyof M, P extends ITypedCommonResource<T> = ITypedCommonResource<T>>(
    resource: P,
  ): Promise<M[T] | undefined>;

  protected _cacheKey(resource: ICommonResource) {
    return `${resource.name}.${resource.type}`;
  }
}
