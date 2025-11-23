import type { RecursivePartial } from '@stone-flower-org/js-utils';

import { initialState as appInitialState } from '@/src/modules/app/utils/store/slices/app';
import { RootState } from '@/src/modules/app/utils/store/types';

export const initialState: RecursivePartial<RootState> = {
  app: {
    ...appInitialState,
    errors: [],
  },
};
