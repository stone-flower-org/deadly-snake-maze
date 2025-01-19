import React, { forwardRef, memo, ReactNode, Ref, useEffect, useState } from 'react';

import { CanvasProps } from '@/src/modules/common/ui/components/Canvas';
import { DSMAppProvider } from '@/src/modules/snake-maze-client/ui/context/DSMAppProvider';
import { DSMApp as DSMAppCore, DSMAppFactory } from '@/src/modules/snake-maze-client/utils/dsm-app';

import { StyledCanvas, StyledContainer } from './styles';

export interface DSMAppProps extends Omit<CanvasProps, 'ref'> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

const _DSMApp = forwardRef(({ className, children, ...props }: DSMAppProps, ref: DSMAppProps['ref']) => {
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
    <StyledContainer
      className="className"
      ref={ref}
    >
      <StyledCanvas
        {...props}
        ref={setCanvasEl}
      />
      {dsmApp && <DSMAppProvider dsmApp={dsmApp}>{children}</DSMAppProvider>}
    </StyledContainer>
  );
});

_DSMApp.displayName = '_DSMApp';

export const DSMApp = memo(_DSMApp);
