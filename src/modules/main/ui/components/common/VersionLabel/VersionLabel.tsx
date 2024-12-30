import React from 'react';

import { StyledSpan, StyledWrapper } from './styles';

export interface VersionLabelProps {
  className?: string;
}

export const VersionLabel = ({ className }: VersionLabelProps) => (
  <StyledWrapper className={className}>
    <StyledSpan>{process.env.APP_VERSION}</StyledSpan>
  </StyledWrapper>
);
