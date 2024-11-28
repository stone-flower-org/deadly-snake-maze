import { TooltipProps as BaseTooltipProps } from '@mui/material';
import React from 'react';

import { Popper, PopperProps } from '@/src/modules/common/ui/components/Popper';

import { StyledTooltip } from './styles';

export interface TooltipProps extends BaseTooltipProps {
  'data-test-id'?: string;
  PopperProps?: PopperProps;
}

export const DEFAULT_TOOLTIP_RPOPS = {
  'data-test-id': 'tooltip',
  PopperComponent: Popper,
};

export const Tooltip = (props: TooltipProps) => (
  <StyledTooltip
    {...DEFAULT_TOOLTIP_RPOPS}
    {...props}
  />
);
