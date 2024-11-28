import { waitFor } from '@testing-library/react';

import { useAlertContext } from '@/src/modules/common/ui/components/Alert/hooks';
import { AlertType } from '@/src/modules/common/ui/components/Alert/types';
import { RenderOptions } from '@/src/modules/tests/types';
import { renderHookWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { useAlert } from './use-alert';

const defaultAlertAttrs = {
  lifetime: 10000,
  message: 'Some Message',
  title: 'Some Title',
};

const renderUseAlert = (renderProps: RenderOptions = {}) =>
  renderHookWithProviders(() => {
    const useAlertValue = useAlert();
    const alertContextValue = useAlertContext();
    return {
      useAlertValue,
      alertContextValue,
    };
  }, renderProps);

beforeAll(async () => {
  await setupAndBootApp();
});

describe('useAlert', () => {
  describe('error', () => {
    it('should add alert item to alert context with error type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.error(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.error,
            }),
          ]),
        );
      });
    });
  });

  describe('info', () => {
    it('should add alert item to alert context with info type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.info(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.info,
            }),
          ]),
        );
      });
    });
  });

  describe('success', () => {
    it('should add alert item to alert context with success type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.success(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.success,
            }),
          ]),
        );
      });
    });
  });

  describe('warning', () => {
    it('should add alert item to alert context with warning type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.warning(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.warning,
            }),
          ]),
        );
      });
    });
  });
});
