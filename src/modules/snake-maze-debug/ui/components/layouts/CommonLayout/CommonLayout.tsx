import React, { PropsWithChildren } from 'react';

import { StyledMainSidebar } from './styles';

export type CommonLayoutProps = PropsWithChildren;

export const CommonLayout = ({ children }: CommonLayoutProps) => (
  <>
    <StyledMainSidebar />
    {children}
  </>
);
