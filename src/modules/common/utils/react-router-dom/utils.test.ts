import { createNamedRoutesMap, generateFullPath } from './utils';

describe('createNamedRoutesMap', () => {
  describe.each([
    {
      name: 'deep routes nesting',
      routes: [
        {
          id: '0',
          path: '/0',
          children: [
            {
              id: '1',
              path: '/1',
              children: [
                {
                  id: '2',
                  path: '/2',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      expectedResult: {
        '0': {
          id: '0',
          path: '/0',
        },
        '1': {
          id: '1',
          path: '/0/1',
        },
        '2': {
          id: '2',
          path: '/0/1/2',
        },
      },
    },
    {
      name: 'unnamed routes',
      routes: [
        {
          id: undefined,
          path: '0',
          children: [
            {
              id: undefined,
              path: '1',
              children: [
                {
                  id: '2',
                  path: '2',
                },
              ],
            },
          ],
        },
      ],
      expectedResult: {
        '2': {
          id: '2',
          path: '/0/1/2',
        },
      },
    },
    {
      name: 'relative paths',
      routes: [
        {
          id: '0',
          path: '0',
          children: [
            {
              id: '1',
              path: '1',
            },
          ],
        },
      ],
      expectedResult: {
        '0': {
          id: '0',
          path: '/0',
        },
        '1': {
          id: '1',
          path: '/0/1',
        },
      },
    },
    {
      name: 'multiple routes on a level',
      routes: [
        {
          id: '0',
          path: '0',
          children: [
            {
              id: '1',
              path: '1',
            },
            {
              id: '2',
              path: '2',
            },
          ],
        },
        {
          id: '3',
          path: '3',
          children: [
            {
              id: '4',
              path: '4',
            },
            {
              id: '5',
              path: '5',
            },
          ],
        },
      ],
      expectedResult: {
        '0': {
          id: '0',
          path: '/0',
        },
        '1': {
          id: '1',
          path: '/0/1',
        },
        '2': {
          id: '2',
          path: '/0/2',
        },
        '3': {
          id: '3',
          path: '/3',
        },
        '4': {
          id: '4',
          path: '/3/4',
        },
        '5': {
          id: '5',
          path: '/3/5',
        },
      },
    },
  ])('should return routes map from routes array', ({ name, routes, expectedResult }) => {
    it(`${name}`, () => {
      expect(createNamedRoutesMap(routes)).toEqual(expectedResult);
    });
  });
});

describe('generateFullPath', () => {
  describe.each([
    {
      name: 'retrun given path when no params provied',
      path: '/some/path',
      params: undefined,
      expectedResult: '/some/path',
    },
    {
      name: 'retrun given path with applied path params',
      path: '/some/path/:first/:second',
      params: {
        params: {
          first: 1,
          second: 2,
        },
      },
      expectedResult: '/some/path/1/2',
    },
    {
      name: 'retrun given path with applied path params',
      path: '/some/path/:first/:second',
      params: {
        params: {
          first: 1,
          second: 2,
        },
      },
      expectedResult: '/some/path/1/2',
    },
    {
      name: 'retrun given path with given query params',
      path: '/some/path/:first/:second',
      params: {
        params: {
          first: 1,
          second: 2,
        },
        query: new URLSearchParams([
          ['a', '1'],
          ['a', '2'],
          ['b', '3'],
        ]),
      },
      expectedResult: '/some/path/1/2?a=1&a=2&b=3',
    },
  ])('should return full path from parh params', ({ name, path, params, expectedResult }) => {
    it(`${name}`, () => {
      expect(generateFullPath(path, params)).toBe(expectedResult);
    });
  });
});
