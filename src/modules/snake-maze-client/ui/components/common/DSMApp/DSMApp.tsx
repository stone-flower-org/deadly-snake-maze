import React, { memo, ReactNode, useEffect, useState } from 'react';

import { Canvas, CanvasProps } from '@/src/modules/common/ui/components/Canvas';
import { DSMAppProvider } from '@/src/modules/snake-maze-client/ui/context/DSMAppProvider';
import { DSMApp as DSMAppCore, DSMAppFactory } from '@/src/modules/snake-maze-client/utils/dsm-app';

export interface DSMAppProps extends CanvasProps {
  children?: ReactNode;
}

const _DSMApp = ({ children, ...props }: DSMAppProps) => {
  const [dsmApp, setDsmApp] = useState<DSMAppCore | null>(null);
  const [canvasEl, setCanvasEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let dsmApp: DSMAppCore | null = null;

    (() => {
      if (!canvasEl) return;

      dsmApp = DSMAppFactory.create().createDSMApp({
        canvas: canvasEl,
        window,
      });

      setDsmApp(dsmApp);
    })();

    return () => {
      dsmApp?.delete();
      setDsmApp(null);
    };
  }, [canvasEl]);

  return (
    <>
      <Canvas
        {...props}
        ref={setCanvasEl}
      />
      {dsmApp && <DSMAppProvider dsmApp={dsmApp}>{children}</DSMAppProvider>}
    </>
  );
};

export const DSMApp = memo(_DSMApp);
