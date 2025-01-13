import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import { StyledCanvas } from './styles';

export interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  ref?: Ref<HTMLCanvasElement>;
}

export const Canvas = forwardRef((props: CanvasProps, ref: CanvasProps['ref']) => (
  <StyledCanvas
    {...props}
    ref={ref}
  />
));

Canvas.displayName = 'Canvas';
