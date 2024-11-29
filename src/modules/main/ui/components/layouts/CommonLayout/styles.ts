import { Container, Paper, styled } from '@mui/material';

export const StyledCommonLayoutContainer = styled(Container)`
  display: flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2, 0)};

  ${({ theme }) => theme.breakpoints.down('md')} {
    gap: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1, 0)};
  }
`;

export const StyledCommonLayoutHeader = styled(Paper)`
  flex: 0 1 auto;
  padding: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(1)};
  }
`;

export const StyledCommonLayoutBody = styled(Paper)`
  flex: 1 1 auto;
  padding: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(1)};
  }
`;
