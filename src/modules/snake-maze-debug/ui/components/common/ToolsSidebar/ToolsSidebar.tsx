import { Close, Create } from '@mui/icons-material';
import React, { ReactElement, useState } from 'react';

import { Case, Switch } from '@/src/modules/common/ui/components/Renderers';
import { Tool, ToolProps } from '@/src/modules/snake-maze-debug/ui/components/common/Tool';

import { StyledIconButton, StyledToolsMenu, StyledToolsSidebarWrapper } from './styles';

export interface ToolsSidebarProps {
  className?: string;
  defaultOpen?: boolean;
  tools?: ReactElement<ToolProps, typeof Tool>[];
}

export const ToolsSidebar = ({ className, defaultOpen = false, tools }: ToolsSidebarProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <StyledToolsSidebarWrapper
      className={className}
      open={open}
    >
      <Switch value={open}>
        <Case value>
          <StyledToolsMenu tools={tools ?? []} />
        </Case>
      </Switch>
      <StyledIconButton onClick={toggleSidebar}>{open ? <Close /> : <Create />}</StyledIconButton>
    </StyledToolsSidebarWrapper>
  );
};
