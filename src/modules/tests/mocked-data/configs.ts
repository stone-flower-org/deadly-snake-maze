import { inject } from 'vitest';

import type { RecursivePartial } from '@stone-flower-org/js-utils';

const DEFAULT_CONFIGS = inject('CONFIGS');

export const makeConfigs = (attrs?: RecursivePartial<typeof DEFAULT_CONFIGS>) => ({
  ...DEFAULT_CONFIGS,
  ...attrs,
});
