import { ResponseResolver, http } from 'msw';

export interface Route {
  method: keyof typeof http;
  url: string;
  resolver: ResponseResolver;
}

export type Router = Record<string, Route>;

export type Middleware = (resolver: ResponseResolver) => ResponseResolver;
