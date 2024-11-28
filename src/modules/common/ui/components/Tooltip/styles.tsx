import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))`
  & .${tooltipClasses.tooltip} {
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: 0;
    box-shadow: ${({ theme }) => theme.shadows[2]};
    color: ${({ theme }) => theme.palette.text.primary};
    padding: ${({ theme }) => theme.spacing(1)};
  }
`;
