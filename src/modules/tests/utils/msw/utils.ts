import { http, HttpResponse, HttpResponseInit, JsonBodyType, RequestHandler, ResponseResolver } from 'msw';

import { Middleware, Route, Router } from './types';

export const makeJsonResponseResolver =
  <B extends JsonBodyType>(bodyGenerator: () => B, init: HttpResponseInit = { status: 200 }): ResponseResolver =>
  () =>
    HttpResponse.json(bodyGenerator(), init);

export const makeRequestHandlerFromRouteWith = (
  { method, url, resolver }: Route,
  middleware: Middleware,
): RequestHandler => http[method](url, middleware(resolver));

export const makeRequestHandlerFromRoute = (router: Route): RequestHandler =>
  makeRequestHandlerFromRouteWith(router, (resolver) => resolver);

export const makeRequestHandlersFromRouterWith = (router: Router, middleware: Middleware) =>
  Object.values(router).map((route) => makeRequestHandlerFromRouteWith(route, middleware));

export const makeRequestHandlersFromRouter = (router: Router): RequestHandler[] =>
  makeRequestHandlersFromRouterWith(router, (resolver) => resolver);

export const overrideResolverWith = (resolver: ResponseResolver) => (): ResponseResolver => resolver;
