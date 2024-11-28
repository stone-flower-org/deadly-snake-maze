import { Box, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContent = styled(Box)``;

export const StyledPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.zIndex.tooltip};
`;
