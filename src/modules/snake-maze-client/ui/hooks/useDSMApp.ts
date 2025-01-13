import { useContext } from 'react';

import { DSMAppContext } from '@/src/modules/snake-maze-client/ui/context/DSMAppProvider';

export const useDSMApp = () => {
  const ctx = useContext(DSMAppContext);
  if (!ctx) throw new Error('useDSMApp must be used within DSMAppContext');
  return ctx;
};
