import { Paper, styled } from '@mui/material';

export const StyledWrapper = styled(Paper)`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.palette.common.white};
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const StyledSpan = styled('span')`
  font-size: 1rem;
`;
