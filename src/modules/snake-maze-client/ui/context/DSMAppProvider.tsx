import React, { FC, PropsWithChildren, createContext } from 'react';

import { DSMApp } from '@/src/modules/snake-maze-client/utils/dsm-app';

export const DSMAppContext = createContext<DSMApp | undefined>(undefined);

export interface DSMAppProps extends PropsWithChildren<unknown> {
  dsmApp: DSMApp;
}

export const DSMAppProvider: FC<DSMAppProps> = ({ children, dsmApp }: DSMAppProps) => (
  <DSMAppContext.Provider value={dsmApp}>{children}</DSMAppContext.Provider>
);
