// eslint-disable-next-line import/no-unresolved
import { setupServer as baseSetupServer } from 'msw/node';

import { handlers } from '@/src/modules/tests/utils/msw/handlers';

export const setupServer = async () => baseSetupServer(...handlers);
