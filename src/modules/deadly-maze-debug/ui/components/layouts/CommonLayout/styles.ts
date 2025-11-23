import { styled } from '@mui/material';

import { MainSidebar } from '@/src/modules/deadly-maze-debug/ui/components/common/MainSidebar';

export const StyledMainSidebar = styled(MainSidebar)`
  position: absolute;
  left: ${({ theme }) => theme.spacing(1)};
  top: ${({ theme }) => theme.spacing(1)};
`;
