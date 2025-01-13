import { IconButton, styled } from '@mui/material';

import { ToolsMenu } from '@/src/modules/snake-maze-debug/ui/components/common/ToolsMenu';

export interface StyledToolsSidebarWrapperProps {
  open?: boolean;
}

export const StyledToolsSidebarWrapper = styled('div', {
  shouldForwardProp: (prop: string) => !['open'].includes(prop),
})<StyledToolsSidebarWrapperProps>`
  align-items: end;
  background: ${({ theme }) => theme.palette.background.paper};
  bottom: 0;
  display: flex;
  flex-flow: row;
  right: 0;
  position: fixed;
  width: ${({ open }) => (open ? '100vw' : 'auto')};
  z-index: ${({ theme }) => theme.zIndex.drawer};
`;

export const StyledIconButton = styled(IconButton)`
  display: flex;
  flex: 0 auto;
`;

export const StyledToolsMenu = styled(ToolsMenu)`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  overflow: auto;
`;
