import { renderHook } from '@testing-library/react';

import { renderHookWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { useAlertContext } from './use-alert-context';

beforeAll(async () => {
  await setupAndBootApp();
});

describe('useAlertContext', () => {
  it('should return Alert Context when called within AlertProvider', () => {
    const hookResult = renderHookWithProviders(() => useAlertContext());
    expect(hookResult.result.current.alerts).toEqual([]);
  });

  it('should throw error when called beyond AlertProvider', () => {
    expect(() => {
      renderHook(() => useAlertContext());
    }).toThrow('useAlertContext must be used within AlertContext');
  });
});
