import { List, styled } from '@mui/material';

export const StyledWrapper = styled('div')`
  display: flex;
  flex-flow: column;
  overflow: auto;
  height: 100%;
  width: 100%;
`;

export const StyledSearchBlock = styled('div')`
  display: flex;
  flex: 0 auto;
  flex-flow: column;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const StyledList = styled(List)`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  overflow: auto;
`;
