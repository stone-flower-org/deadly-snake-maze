import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { app } from '@/src/modules/app/boot';
import { setupApp } from '@/src/modules/tests/utils';

import { AppBoot } from './AppBoot';

const children = 'Some content';

const renderAppBoot = () => render(<AppBoot>{children}</AppBoot>);

beforeEach(() => {
  setupApp();
});

describe('AppBoot', () => {
  it('should show progressbar while app booting', async () => {
    const bootSpy = vi.spyOn(app, 'boot').mockImplementation(() => new Promise(() => undefined));
    const { findByRole } = renderAppBoot();

    await waitFor(async () => {
      expect(await findByRole('progressbar', { name: /app booting/i })).toBeInTheDocument();
    });

    bootSpy.mockRestore();
  });

  it('should render children when app is booted', async () => {
    const bootSpy = vi.spyOn(app, 'boot').mockImplementation(() => new Promise((resolve) => resolve()));
    const { findByText } = renderAppBoot();

    await waitFor(async () => {
      expect(await findByText(children)).toBeInTheDocument();
    });

    bootSpy.mockRestore();
  });
});
