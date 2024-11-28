import { vi } from 'vitest';

import { makeInMemoryCookies } from '@/src/modules/tests/mocks';

vi.mock('js-cookie', () => makeInMemoryCookies());
