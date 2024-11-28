import { createAutoincrementIdGenerator } from '@stone-flower-org/js-utils';

import { AlertItem, AlertItemParams } from './types';

const createId = createAutoincrementIdGenerator();

export const createAlertItem = (params: AlertItemParams): AlertItem => ({
  ...params,
  id: createId(),
  lifetime: params.lifetime ?? null,
});
