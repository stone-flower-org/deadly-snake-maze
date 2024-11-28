import { waitFor } from '@testing-library/react';

import { RenderHookOptions } from '@/src/modules/tests/types';
import {
  overrideInitialState,
  renderHookWithProviders,
  setupAndBootApp,
  setupAppService,
  setupStore,
} from '@/src/modules/tests/utils';

import { useAppErrors } from './use-app-errors';

const defaultErrors = [new Error('Some Error')];

const renderUseAppErrors = (renderProps: RenderHookOptions = {}) =>
  renderHookWithProviders(() => useAppErrors(), renderProps);

beforeAll(async () => {
  await setupAndBootApp();
});

beforeEach(async () => {
  setupAppService(
    'store',
    setupStore({
      preloadedState: overrideInitialState({
        app: {
          errors: defaultErrors,
        },
      }),
    }),
  );
});

describe('useAppErrors', () => {
  describe('addError', () => {
    it('should add given error', async () => {
      const newError = new Error('Some New Error');
      const composition = renderUseAppErrors();
      await waitFor(() => {
        composition.result.current.addError(newError);
      });
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual([...defaultErrors, newError]);
      });
    });
  });

  describe('errors', () => {
    it('should return errors from store', async () => {
      const composition = renderUseAppErrors();
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual(defaultErrors);
      });
    });
  });

  describe('setErrors', () => {
    it('should set given errors', async () => {
      const errors: Error[] = [];
      const composition = renderUseAppErrors();
      await waitFor(() => {
        composition.result.current.setErrors(errors);
      });
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual(errors);
      });
    });
  });
});
