import { RouteObject } from 'react-router-dom';

import {
  createNamedRoutesMap,
  generateFullPath as generateFullPath,
  FullPathParams,
  NamedRoute,
  NamedRoutesMap,
} from './utils';

export interface RoutesStore {
  getNamedRoutesMap: () => NamedRoutesMap;
  findNamedRouteById: (id: string) => NamedRoute | undefined;
  generateFullPathById: (id: string, params?: FullPathParams) => string;
}

interface RoutesStoreCtx {
  namedRoutesMap: NamedRoutesMap;
}

const getNamedRoutesMap = ({ namedRoutesMap }: RoutesStoreCtx) => namedRoutesMap;

const findNamedRouteById = ({ namedRoutesMap }: RoutesStoreCtx, id: string) => {
  const route = namedRoutesMap[id];
  if (!route) throw new Error(`Route with id ${id} is not found`);
  return route;
};

const generateFullPathById = (ctx: RoutesStoreCtx, id: string, params: FullPathParams = {}) => {
  const route = findNamedRouteById(ctx, id);
  return generateFullPath(route.path, params);
};

export const createRoutesStore = (routes: RouteObject[]): RoutesStore => {
  const ctx = {
    namedRoutesMap: createNamedRoutesMap(routes),
  };

  return {
    getNamedRoutesMap: getNamedRoutesMap.bind(undefined, ctx),
    findNamedRouteById: findNamedRouteById.bind(undefined, ctx),
    generateFullPathById: generateFullPathById.bind(undefined, ctx),
  };
};
