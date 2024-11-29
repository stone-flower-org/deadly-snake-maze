import { ICommonResource, ITypedCommonResource } from './resource';

export type IResourceMap = Record<string, unknown>;

export interface IResourceManager<M extends IResourceMap = IResourceMap> {
  load<T extends keyof M>(resource: ITypedCommonResource<T>): Promise<M[T]>;
  loadAll<P extends ICommonResource[], R extends Promise<{ -readonly [K in keyof P]: Awaited<M[P[K]['type']]> }>>(
    resources: P,
  ): R;
  clear(resource: ICommonResource): void;
  clearAll(): void;
}
