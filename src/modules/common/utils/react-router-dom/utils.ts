import { generatePath, RouteObject } from 'react-router-dom';

export type PathParams = Parameters<typeof generatePath>[1];

export type FullPathParams = {
  query?: URLSearchParams;
  params?: PathParams;
};

export type NamedRoute = {
  id: string;
  path: string;
};

export type NamedRoutesMap = Record<string, NamedRoute | undefined>;

export const createNamedRoutesMap = (routes: RouteObject[]) => {
  const map: NamedRoutesMap = {};

  const buildMapFromRoute = (route: RouteObject, path: string, out: typeof map) => {
    const routePath = path + '/' + (route.path?.replace(/^\//g, '') || '');

    if (route.id !== undefined) {
      out[route.id] = {
        id: route.id,
        path: routePath,
      };
    }

    route.children?.forEach((child) => buildMapFromRoute(child, routePath, out));
  };

  routes.forEach((route) => buildMapFromRoute(route, '', map));

  return map;
};

export const generateFullPath = (pattern: string, { query, params }: FullPathParams = {}) => {
  const queryString = query?.toString();
  return generatePath(pattern, params) + (queryString ? '?' + queryString : '');
};
