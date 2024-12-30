import React, { FC } from 'react';

import { MainMenu } from '@/src/modules/main/ui/components/common/MainMenu';

import { StyledBackground, StyledMenuBlock, StyledVersionLabel, StyledWrapper } from './styles';

export const Main: FC = () => (
  <StyledWrapper>
    <StyledBackground />
    <StyledMenuBlock>
      <MainMenu />
    </StyledMenuBlock>
    <StyledVersionLabel />
  </StyledWrapper>
);
