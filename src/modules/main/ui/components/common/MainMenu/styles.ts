import { styled } from '@mui/material';

import { ButtonLink } from '@/src/modules/common/ui/components/ButtonLink';

export const StyledWrapper = styled('div')`
  display: flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing(4)};
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const StyledLogoBlock = styled('div')`
  display: flex;
  flex: 0 auto;
  justify-content: center;
`;

export const StyledMenu = styled('ul')`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacing(2)};
  list-style-type: none;
  overflow: auto;
`;

export const StyledMenuItem = styled('li')`
  display: flex;
  justify-content: center;
`;

export const StyledButtonLink = styled(ButtonLink)``;
