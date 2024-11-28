import { Button, css, keyframes, styled } from '@mui/material';

import { Card } from '@/src/modules/common/ui/components/Card';
import { getColorFromTheme } from '@/src/modules/common/utils/mui';

export const StyledAlertBarContainer = styled('div')`
  bottom: 0;
  display: block;
  position: absolute;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  max-height: 100vh;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 0)};
  width: ${({ theme }) => theme.breakpoints.values.sm}px;

  &:empty {
    padding: 0;
    width: 0;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(1)};
    width: 100%;
  }
`;

export const StyledAlertContainer = styled(Card)`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  margin: ${({ theme }) => theme.spacing(0, 0, 2)};
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  &:last-of-type {
    margin: 0;
  }
`;

export const StyledAlertHeader = styled('div')`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StyledAlertTitle = styled('p')`
  ${({ theme }) => theme.typography.h6}
  display: flex;
  font-weight: 600;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(1, 0)};
`;
export interface StyledAlertIconProps {
  color?: string;
}

export const StyledAlertIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<StyledAlertIconProps>`
  align-self: stretch;
  background: ${({ theme, color = 'info' }) => getColorFromTheme(theme, color)};
  display: flex;
  width: 2.5rem;
`;

export const StyledAlertBtn = styled(Button)``;

export const StyledAlertBody = styled('div')`
  ${({ theme }) => theme.typography.body1}
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export interface StyledDisappearanceTimerProps {
  color?: string;
  time?: number | null;
}

const disappear = keyframes`
  from {
    transform: translate(0%, 0)
  },
  to {
    transform: translate(100%, 0)
  }
`;

export const StyledDisappearanceTimer = styled('span', {
  shouldForwardProp: (prop: string) => !['color', 'time'].includes(prop),
})<StyledDisappearanceTimerProps>`
  animation: ${({ time }) => css`
    ${disappear} ${time ?? 0}ms ease forwards
  `};
  border-color: ${({ theme, color = 'info' }) => getColorFromTheme(theme, color)};
  border-style: solid;
  border-width: 2px;
  bottom: 0;
  position: absolute;
  width: 100%;
`;
