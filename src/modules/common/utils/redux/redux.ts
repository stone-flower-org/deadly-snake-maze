import {
  createAsyncThunk as baseCreateAsyncThunk,
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
} from '@reduxjs/toolkit';
import { isKeyOf } from '@stone-flower-org/js-utils';

import { ActionParams } from './types';

export const normilizeNTransformEntities = <K extends keyof E, E extends object = object, O extends object = object>(
  items: O[],
  key: K,
  transform: (item: O) => E,
) =>
  items.reduce<{ ids: E[K][]; entities: Record<string | number, E> }>(
    (data, item) => {
      const transformed = transform(item);
      const id = (isKeyOf(transformed, key) ? transformed[key] : '') as string | number | object;
      if (typeof id === 'object' || id === null) return data;
      data.ids.push(id as E[K]);
      data.entities[id] = transformed;
      return data;
    },
    {
      ids: [],
      entities: {},
    },
  );

export const normilizeEntities = <K extends keyof E, E extends object = object>(entities: E[], key: K) =>
  normilizeNTransformEntities<K, E, E>(entities, key, (item) => item);

export const denormilizeEntities = <K extends string | number, E extends object>(
  entities: Record<K, E>,
  keys: K[],
): E[] => keys.map((key) => entities[key]);

export const createAsyncThunk = <Returned, ThunkArg extends ActionParams = ActionParams>(
  actionName: string,
  func: AsyncThunkPayloadCreator<Returned, ThunkArg>,
  options?: AsyncThunkOptions<ThunkArg>,
) => baseCreateAsyncThunk(actionName, func, options);
