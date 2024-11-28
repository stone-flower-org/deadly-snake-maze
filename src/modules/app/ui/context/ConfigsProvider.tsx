import React, { createContext, FC, ReactNode } from 'react';

import { AppConfigs } from '@/src/modules/app/utils/app';

export const ConfigsContext = createContext<AppConfigs | undefined>(undefined);

export interface ConfigsProviderProps {
  children?: ReactNode;
  value: AppConfigs;
}

export const ConfigsProvider: FC<ConfigsProviderProps> = ({ children, value }: ConfigsProviderProps) => (
  <ConfigsContext.Provider value={value}>{children}</ConfigsContext.Provider>
);
