import { queries as baseQueries } from '@testing-library/react';

export const customQueries = {};

export const queries = {
  ...baseQueries,
  ...customQueries,
};
