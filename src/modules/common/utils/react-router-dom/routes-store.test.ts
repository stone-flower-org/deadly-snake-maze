import { createRoutesStore } from './routes-store';

describe('createRoutesStore', () => {
  it('should return RoutesStore', () => {
    expect(createRoutesStore([])).toBeInstanceOf(Object);
  });

  describe('getNamedRoutesMap', () => {
    describe.each([
      {
        name: 'return NamedRoutesMap',
        routes: [
          {
            id: '1',
            path: '1',
            children: [
              {
                id: '2',
                path: '2',
              },
            ],
          },
        ],
        expectedResult: {
          '1': {
            id: '1',
            path: '/1',
          },
          '2': {
            id: '2',
            path: '/1/2',
          },
        },
      },
    ])('should return NamedRoutesMap', ({ name, routes, expectedResult }) => {
      it(`${name}`, () => {
        const store = createRoutesStore(routes);
        expect(store.getNamedRoutesMap()).toEqual(expectedResult);
      });
    });
  });

  describe('findNamedRouteById', () => {
    describe.each([
      {
        name: ' return found NamedRoute by id',
        routes: [
          {
            id: '1',
            path: '1',
          },
        ],
        id: '1',
        expectedResult: {
          id: '1',
          path: '/1',
        },
      },
      {
        name: 'throw error when given id is not found',
        routes: [
          {
            id: '1',
            path: '1',
          },
        ],
        id: '2',
        expectedResult: new Error('Route with id 2 is not found'),
      },
    ])('should return found NamedRoutes by id', ({ name, routes, id, expectedResult }) => {
      it(`${name}`, () => {
        const store = createRoutesStore(routes);

        if (expectedResult instanceof Error) {
          expect(() => {
            store.findNamedRouteById(id);
          }).toThrow(expectedResult);
          return;
        }

        expect(store.findNamedRouteById(id)).toEqual(expectedResult);
      });
    });
  });

  describe('generateFullPathById', () => {
    it('should throw error when route is not found by provided id', () => {
      const routes = [
        {
          id: '1',
          path: '/some/path/:first/:second',
        },
      ];
      const store = createRoutesStore(routes);
      expect(() => {
        store.generateFullPathById('-1');
      }).toThrow('');
    });

    describe.each([
      {
        name: 'retrun given path with given query params',
        routes: [
          {
            id: '1',
            path: '/some/path/:first/:second',
          },
        ],
        id: '1',
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
    ])(
      'should return full path from provided route id and path params',
      ({ name, routes, id, params, expectedResult }) => {
        it(`${name}`, () => {
          const store = createRoutesStore(routes);
          expect(store.generateFullPathById(id, params)).toBe(expectedResult);
        });
      },
    );
  });
});
