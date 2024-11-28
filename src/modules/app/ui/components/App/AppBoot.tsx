import { createProgress } from '@stone-flower-org/js-utils';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { app } from '@/src/modules/app/boot';
import { APP_BOOT_STEPS } from '@/src/modules/app/constants';
import { AppBootModal } from '@/src/modules/app/ui/components/AppBootModal';
import { AppBootProvider } from '@/src/modules/app/ui/context/AppBootProvider';
import { useAppBoot } from '@/src/modules/app/ui/hooks';

export type AppBootProps = PropsWithChildren<unknown>;

const AppBootContent = ({ children }: AppBootProps) => {
  const { progress } = useAppBoot();

  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    progress.advance();

    app
      .boot()
      .then(() => {
        setIsBooting(false);
        progress.advance();
      })
      .catch((e) => {
        console.error(e);
      });
  }, [progress]);

  return (
    <>
      {!isBooting && children}
      <AppBootModal progress={progress.getProgress()} />
    </>
  );
};

export const AppBoot = (props: AppBootProps) => {
  const progress = useMemo(() => createProgress({ totalSteps: APP_BOOT_STEPS }), []);
  return (
    <AppBootProvider progress={progress}>
      <AppBootContent {...props} />
    </AppBootProvider>
  );
};
