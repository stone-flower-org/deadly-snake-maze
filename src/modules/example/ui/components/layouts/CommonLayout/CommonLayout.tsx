import React, { PropsWithChildren } from 'react';

import { LogoIcon } from '@/src/modules/app/ui/Icons';

import { StyledCommonLayoutBody, StyledCommonLayoutContainer, StyledCommonLayoutHeader } from './styles';

export type CommonLayoutProps = PropsWithChildren;

export const CommonLayout = ({ children }: CommonLayoutProps) => (
  <StyledCommonLayoutContainer>
    <StyledCommonLayoutHeader>
      <h1>
        <LogoIcon fontSize="inherit" /> React Template
      </h1>
    </StyledCommonLayoutHeader>
    <StyledCommonLayoutBody>{children}</StyledCommonLayoutBody>
  </StyledCommonLayoutContainer>
);
