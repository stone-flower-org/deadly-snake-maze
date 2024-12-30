import { styled } from '@mui/material';

import { Background } from '@/src/modules/main/ui/components/common/Background';
import { VersionLabel } from '@/src/modules/main/ui/components/common/VersionLabel';

export const StyledWrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: center;
  overflow: auto;
  height: 100%;
  width: 100%;
`;

export const StyledBackground = styled(Background)`
  position: absolute;
  z-index: 0;
`;

export const StyledMenuBlock = styled('div')`
  display: flex;
  margin: ${({ theme }) => theme.spacing(4, 0)};
  max-width: ${({ theme }) => theme.breakpoints.values.sm}px;
  overflow: auto;
  z-index: 1;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: ${({ theme }) => theme.spacing(2, 0)};
    max-width: 100%;
  }
`;

export const StyledVersionLabel = styled(VersionLabel)`
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 2;
`;
