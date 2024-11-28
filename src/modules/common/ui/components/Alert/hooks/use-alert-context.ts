import { useContext } from 'react';

import { AlertContext } from '@/src/modules/common/ui/components/Alert/context';

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within AlertContext');
  return ctx;
};
