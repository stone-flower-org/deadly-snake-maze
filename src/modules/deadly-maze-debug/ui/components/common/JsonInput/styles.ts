import { Button, styled, TextareaAutosize } from '@mui/material';

export interface StyledInputProps {
  error?: boolean;
}

export const StyledInput = styled(TextareaAutosize, {
  shouldForwardProp: (prop: string) => !['error'].includes(prop),
})<StyledInputProps>`
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: ${({ theme }) => theme.spacing(1)};
  width: 100%;

  ${({ error, theme }) => (error ? `border-color: ${theme.palette.error.main};` : '')}
`;

export const StyledWrapper = styled('div')`
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const StyledFooter = styled('div')`
  align-items: center;
  display: flex;
  font-size: 0.75rem;
  justify-content: space-between;
  overflow: scroll;
  padding: ${({ theme }) => theme.spacing(0.5)};
  width: 100%;
`;

export const StyledActions = styled('div')`
  display: flex;
  flex: 2 2;
  overflow: scroll;
`;

export const StyledButton = styled(Button)`
  font-size: 1em;
  padding: 0;
`;

export const StyledLog = styled('div')`
  display: flex;
  height: 1.2em;
  flex: 1 1;
  font-size: 1em;
  justify-content: end;
  overflow: hidden;
`;

export const StyledErrorMessage = styled('div')`
  color: ${({ theme }) => theme.palette.error.main};
  height: 100%;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  text-wrap: nowrap;
`;
