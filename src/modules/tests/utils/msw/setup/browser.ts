// eslint-disable-next-line import/no-unresolved
import { setupWorker as baseSetupWorker } from 'msw/browser';

import { handlers } from '@/src/modules/tests/utils/msw/handlers';

export const setupWorker = async () => baseSetupWorker(...handlers);
