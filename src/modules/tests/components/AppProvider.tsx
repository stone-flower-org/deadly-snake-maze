import { createProgress } from '@stone-flower-org/js-utils';
import React, { FC, ReactNode } from 'react';
import { Router } from 'react-router-dom';

import { AppProviders } from '@/src/modules/app/ui/components/App/AppProviders';
import { AppBootProvider } from '@/src/modules/app/ui/context/AppBootProvider';
import { createMemoryHistory, MemoryHistory } from '@/src/modules/tests/utils';

import type { Progress } from '@stone-flower-org/js-utils';

export interface AppProviderProps {
  children?: ReactNode;
  history?: MemoryHistory;
  bootProgress?: Progress;
}
export const AppProvider: FC<AppProviderProps> = ({
  bootProgress = createProgress(),
  children,
  history = createMemoryHistory(),
}: AppProviderProps) => (
  <AppBootProvider progress={bootProgress}>
    <AppProviders>
      <Router
        location={history.location}
        navigator={history}
      >
        {children}
      </Router>
    </AppProviders>
  </AppBootProvider>
);
