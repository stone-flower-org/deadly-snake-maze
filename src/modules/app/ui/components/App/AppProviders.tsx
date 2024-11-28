import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { FC, PropsWithChildren } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { app } from '@/src/modules/app/boot';
import { ConfigsProvider } from '@/src/modules/app/ui/context/ConfigsProvider';
import { AlertProvider } from '@/src/modules/common/ui/components/Alert/context';

export type AppProvidersProps = PropsWithChildren;

export const AppProviders: FC<AppProvidersProps> = ({ children }: AppProvidersProps) => (
  <ConfigsProvider value={app.getService('configs')}>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StoreProvider store={app.getService('store')}>
        <AlertProvider>{children}</AlertProvider>
      </StoreProvider>
    </LocalizationProvider>
  </ConfigsProvider>
);
