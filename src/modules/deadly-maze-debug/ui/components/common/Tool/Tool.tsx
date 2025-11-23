import { Args } from '@stone-flower-org/js-utils';
import React, { FC, ReactElement, ReactNode } from 'react';

export interface ToolProps {
  panel: ReactNode;
  tab: ReactNode;
}

export const Tool: FC<ToolProps> = () => null;

export type ToolReactElement = ReactElement<ToolProps, typeof Tool>;
