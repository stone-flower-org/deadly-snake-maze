import React, { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';

import type { Progress } from '@stone-flower-org/js-utils';

export interface AppBootProviderValue {
  progress: Progress;
}

export interface AppBootProviderProps {
  children?: ReactNode;
  progress: Progress;
}

export const AppBootContext = createContext<AppBootProviderValue | undefined>(undefined);

export const AppBootProvider: FC<AppBootProviderProps> = ({ children, progress }: AppBootProviderProps) => {
  const [value, setValue] = useState({
    progress,
  });

  const onProgressChange = useCallback((progress: Progress) => {
    setValue((value) => ({
      ...value,
      progress,
    }));
  }, []);

  useEffect(() => {
    const unsubscribe = value.progress.subscribe(onProgressChange);
    return () => {
      unsubscribe();
    };
  }, [value.progress, onProgressChange]);

  return <AppBootContext.Provider value={value}>{children}</AppBootContext.Provider>;
};
