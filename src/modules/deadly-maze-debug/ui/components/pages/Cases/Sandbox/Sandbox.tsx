import React, { FC, useEffect } from 'react';

import { DSMApp } from '@/src/modules/deadly-maze-client/ui/components/common/DSMApp';
import { useDSMApp } from '@/src/modules/deadly-maze-client/ui/hooks/useDSMApp';

import { SandboxTools } from './components/SandboxTools';

const _Sandbox: FC = () => {
  const dsmApp = useDSMApp();

  useEffect(() => {
    dsmApp.boot().then(() => dsmApp.start());
  }, [dsmApp]);

  return <SandboxTools />;
};

export const Sandbox = () => (
  <DSMApp>
    <_Sandbox />
  </DSMApp>
);
