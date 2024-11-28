import { denormilizeEntities, normilizeEntities, normilizeNTransformEntities } from './redux';

const makeEntity = (attrs: Record<string, unknown> = {}) => ({
  id: 1,
  name: '1',
  ...attrs,
});

const defaultEntities = [
  makeEntity({
    id: 1,
    name: '1',
  }),
  makeEntity({
    id: 2,
    name: '2',
  }),
];

const defaultNormalizedEntities = {
  entities: {
    [defaultEntities[0].id]: defaultEntities[0],
    [defaultEntities[1].id]: defaultEntities[1],
  },
  ids: [defaultEntities[0].id, defaultEntities[1].id],
};

const defaultTransformer = (obj: Record<string, unknown>) => ({
  id: obj.id,
  title: obj.name,
});

describe('normilizeNTransformEntities', () => {
  it('should return transformed normalized objects', () => {
    const expectedResult = {
      entities: {
        1: {
          id: 1,
          title: '1',
        },
        2: {
          id: 2,
          title: '2',
        },
      },
      ids: [1, 2],
    };
    expect(normilizeNTransformEntities(defaultEntities, 'id', defaultTransformer)).toEqual(expectedResult);
  });

  it('should skip entity when it has non primitive key', () => {
    const entities = [
      makeEntity({
        id: {},
      }),
    ];
    const expectedResult = {
      entities: {},
      ids: [],
    };
    expect(normilizeNTransformEntities(entities, 'id', defaultTransformer)).toEqual(expectedResult);
  });

  it('should skip entity when it has empty key', () => {
    const entities = [
      makeEntity({
        id: null,
      }),
    ];
    const expectedResult = {
      entities: {},
      ids: [],
    };
    expect(normilizeNTransformEntities(entities, 'id', defaultTransformer)).toEqual(expectedResult);
  });
});

describe('normilizeEntities', () => {
  it('should return normalized entities', () => {
    expect(normilizeEntities(defaultEntities, 'id')).toEqual(defaultNormalizedEntities);
  });
});

describe('denormilizeEntities', () => {
  it('should return denormalized entities', () => {
    expect(denormilizeEntities(defaultNormalizedEntities.entities, defaultNormalizedEntities.ids)).toEqual(
      defaultEntities,
    );
  });
});
