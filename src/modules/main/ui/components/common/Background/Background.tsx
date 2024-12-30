import React from 'react';

import { StyledWrapper } from './styles';

export interface BackgroundProps {
  className?: string;
}

export const Background = ({ className }: BackgroundProps) => <StyledWrapper className={className} />;
