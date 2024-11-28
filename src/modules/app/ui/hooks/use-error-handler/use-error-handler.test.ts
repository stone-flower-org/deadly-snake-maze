import { waitFor } from '@testing-library/react';
import { MockInstance, vi } from 'vitest';

import { app } from '@/src/modules/app/boot';
import { useAlertContext } from '@/src/modules/common/ui/components/Alert/hooks';
import { AlertType } from '@/src/modules/common/ui/components/Alert/types';
import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHookWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { useErrorHandler } from './use-error-handler';

let reportSpy: MockInstance | undefined;

const error = new Error('Some Error');

const renderUseErrorHandler = (renderProps: RenderHookOptions = {}) =>
  renderHookWithProviders(() => {
    const useErrorHandlerValue = useErrorHandler();
    const alertContextValue = useAlertContext();
    return {
      useErrorHandlerValue,
      alertContextValue,
    };
  }, renderProps);

beforeAll(async () => {
  await setupAndBootApp();
  const errorReporter = app.getService('error-reporter');
  reportSpy = vi.spyOn(errorReporter, 'report').mockImplementation(async () => undefined);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useErrorHandler', () => {
  it('should report error when handler called', async () => {
    const composition = renderUseErrorHandler();
    await waitFor(() => {
      composition.result.current.useErrorHandlerValue(error);
    });
    await waitFor(() => {
      expect(reportSpy).toHaveBeenCalledWith(error);
    });
  });

  it('should add error alert with error message', async () => {
    const composition = renderUseErrorHandler();
    await waitFor(() => {
      composition.result.current.useErrorHandlerValue(error);
    });
    await waitFor(() => {
      expect(composition.result.current.alertContextValue.alerts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: AlertType.error,
            message: error.message,
          }),
        ]),
      );
    });
  });
});
