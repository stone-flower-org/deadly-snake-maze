import { Button, styled } from '@mui/material';

export const StyledToolsMenuWrapper = styled('div')`
  height: 100%;
  width: 100%;
`;

export const StyledStyledTabsListWrapper = styled('div')`
  overflow: auto;
  width: 100%;
`;

export const StyledTabsList = styled('ul')`
  display: flex;
  list-style-type: none;
  overflow: auto;
  width: fit-content;
`;

export const StyledTab = styled('li')`
  display: flex;
`;

export const StyledTabButton = styled(Button)`
  min-width: unset;
`;

export const StyledTabPanel = styled('div')`
  max-height: 160px;
  overflow: auto;
  width: 100%;
`;
