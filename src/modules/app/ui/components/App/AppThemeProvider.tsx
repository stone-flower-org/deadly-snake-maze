import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { FC, PropsWithChildren } from 'react';

import { theme } from '@/src/modules/app/constants';

export type AppThemeProviderProps = PropsWithChildren;

export const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }: AppThemeProviderProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
