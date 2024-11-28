import React, { FC } from 'react';

import { AppBoot } from './AppBoot';
import { AppErrorBoundary } from './AppErrorBoundary';
import { AppLayout } from './AppLayout';
import { AppProviders } from './AppProviders';
import { AppRouter } from './AppRouter';
import { AppThemeProvider } from './AppThemeProvider';
import './styles.scss';

export const App: FC = () => (
  <AppThemeProvider>
    <AppBoot>
      <AppErrorBoundary>
        <AppProviders>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </AppProviders>
      </AppErrorBoundary>
    </AppBoot>
  </AppThemeProvider>
);
