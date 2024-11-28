import React from 'react';
import { vi } from 'vitest';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { ThrowRouteError, ThrowRouteErrorProps } from './ThrowRouteError';

const mocks = vi.hoisted(() => ({
  useRouteError: vi.fn(),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useRouteError: mocks.useRouteError,
}));

const defaultProps = {
  children: undefined,
};

const renderThrowRouteError = (props: Partial<ThrowRouteErrorProps> = {}) =>
  renderWithProviders(
    <ThrowRouteError
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

afterEach(() => {
  mocks.useRouteError.mockReset();
});

describe('ThrowRouteError', () => {
  it('should render provided children', () => {
    const children = 'Children Content';
    const { getByText } = renderThrowRouteError({ children: <>{children}</> });
    expect(getByText(children)).toBeInTheDocument();
  });

  it('should throw error when useRouteError returns error', () => {
    const error = new Error('error');
    mocks.useRouteError.mockReturnValue(error);
    expect(() => {
      renderThrowRouteError();
    }).toThrow(error);
  });
});
