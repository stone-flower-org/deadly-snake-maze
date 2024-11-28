import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useErrorHandler, useAppErrors, useAppBoot } from '@/src/modules/app/ui/hooks';
import { AlertBar } from '@/src/modules/common/ui/components/Alert';
import { useAlertContext } from '@/src/modules/common/ui/components/Alert/hooks';

export type AppLayoutProps = PropsWithChildren;

export const AppLayout: FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
  const handleError = useErrorHandler();
  const { errors, setErrors } = useAppErrors();
  const { alerts, remove } = useAlertContext();
  const { progress } = useAppBoot();

  useEffect(() => {
    if (errors.length) {
      errors.forEach(handleError);
      setErrors([]);
    }
  }, [errors, handleError, setErrors]);

  useEffect(() => {
    progress.finish();
  }, [progress]);

  return (
    <>
      {children}
      <AlertBar
        alerts={alerts}
        onClose={remove}
      />
    </>
  );
};
