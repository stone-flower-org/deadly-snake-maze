import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { FC, useState } from 'react';

import { CaseMenu } from '@/src/modules/deadly-maze-debug/ui/components/common/CaseMenu';

import { StyledBody, StyledDrawer, StyledDrawerContent, StyledHeader, StyledIcon, StyledIconButton } from './styles';

export interface MainSidebarProps {
  className?: string;
}

export const MainSidebar: FC<MainSidebarProps> = ({ className }: MainSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (open: boolean) => () => {
    setSidebarOpen(open);
  };

  return (
    <>
      <StyledIconButton
        className={className}
        onClick={toggleSidebar(true)}
      >
        <StyledIcon />
      </StyledIconButton>
      <StyledDrawer
        onClose={toggleSidebar(false)}
        open={sidebarOpen}
      >
        <StyledDrawerContent>
          <StyledHeader>
            <IconButton onClick={toggleSidebar(false)}>
              <ArrowBack />
            </IconButton>
          </StyledHeader>
          <StyledBody>
            <CaseMenu />
          </StyledBody>
        </StyledDrawerContent>
      </StyledDrawer>
    </>
  );
};
