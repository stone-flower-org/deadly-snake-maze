import { Menu } from '@mui/icons-material';
import { Drawer, IconButton, styled } from '@mui/material';

export const StyledIconButton = styled(IconButton)``;

export const StyledIcon = styled(Menu)``;

export const StyledDrawer = styled(Drawer)``;

export const StyledDrawerContent = styled('div')`
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow: auto;
  width: 320px;
`;

export const StyledHeader = styled('div')`
  align-items: start;
  border-bottom: solid 1px ${({ theme }) => theme.palette.divider};
  display: flex;
  flex: 0 auto;
  flex-flow: column;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const StyledBody = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  overflow: auto;
`;
