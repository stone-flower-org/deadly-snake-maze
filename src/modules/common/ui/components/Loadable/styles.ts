import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFallbackContainer = styled(Box)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;
