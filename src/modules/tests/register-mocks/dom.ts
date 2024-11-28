import { vi } from 'vitest';

import {
  IntersectionObserverMock,
  makeIntersectionObserver,
  makeMutationObserver,
  makeResizeObeserver,
  MutationObserverMock,
} from '@/src/modules/tests/mocks';

global.Element.prototype.scrollTo = vi.fn().mockReturnValue(undefined);

global.ResizeObserver = makeResizeObeserver();

global.IntersectionObserver = makeIntersectionObserver();
afterEach(() => {
  (global.IntersectionObserver as IntersectionObserverMock).clear();
});

global.MutationObserver = makeMutationObserver();
afterEach(() => {
  (global.MutationObserver as MutationObserverMock).clear();
});
