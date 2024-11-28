import { waitFor } from '@testing-library/react';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { clearDocument, renderHook } from '@/src/modules/tests/utils';

import { useTitle } from './use-title';

type UseTitleParams = Parameters<typeof useTitle>;

const renderUseTitle = (renderProps: RenderHookOptions<UseTitleParams> = {}) =>
  renderHook((initialProps: UseTitleParams) => {
    useTitle(...initialProps);
  }, renderProps);

afterEach(() => {
  clearDocument();
});

describe('useTitle', () => {
  it('should set given title', async () => {
    const title = 'Title';
    renderUseTitle({
      initialProps: [title],
    });
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});
