import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

import { setupApp, setupAppService } from '@/src/modules/tests/utils';

import { App } from './App';

const renderApp = () => render(<App />);

beforeEach(() => {
  setupApp();
});

describe('App', () => {
  it('should boot and render given page', async () => {
    const routes = [
      {
        path: '/',
        element: 'Index Page Content',
      },
    ];
    setupAppService(
      'router',
      createMemoryRouter(routes, {
        initialEntries: [routes[0].path],
        initialIndex: 0,
      }),
    );
    const { findByText } = renderApp();

    await waitFor(async () => {
      expect(await findByText(routes[0].element)).toBeInTheDocument();
    });
  });
});
