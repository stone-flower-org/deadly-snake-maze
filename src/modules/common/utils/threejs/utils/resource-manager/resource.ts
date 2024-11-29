export interface ICommonResource {
  name: string;
  type: string;
  path: unknown;
}

export type ITypedCommonResource<T> = ICommonResource & { type: T };
