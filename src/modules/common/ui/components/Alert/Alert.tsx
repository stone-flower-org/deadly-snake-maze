import { Collapse } from '@mui/material';
import React, { FC, HTMLProps, useState } from 'react';

import { AlertItem } from '@/src/modules/common/ui/components/Alert/types';

import {
  StyledAlertContainer,
  StyledAlertHeader,
  StyledAlertIcon,
  StyledAlertTitle,
  StyledAlertBtn,
  StyledAlertBody,
  StyledDisappearanceTimer,
} from './styles';

export interface AlertProps extends AlertItem, Omit<HTMLProps<HTMLDivElement>, 'title' | 'id' | 'type' | 'as'> {
  onClose: (id: AlertItem['id']) => void;
}

export const DEFAULT_ALERT_PROPS = {
  'data-test-id': 'alert',
} as const;

export const Alert: FC<AlertProps> = (props: AlertProps) => {
  const { id, lifetime, message, title, type, onClose, open, timeoutId: _, ...rest } = props;

  const containerProps = { ...DEFAULT_ALERT_PROPS, ...rest };

  const dataName = containerProps['data-test-id'];

  const [isOpen, setIsOpen] = useState(open);

  const onHeaderClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onCloseClick = () => {
    onClose(id);
  };

  return (
    <StyledAlertContainer
      {...containerProps}
      role="alert"
    >
      <StyledAlertHeader
        data-test-id={`${dataName}-header`}
        onClick={onHeaderClick}
      >
        <StyledAlertIcon color={type} />
        <StyledAlertTitle>{title}</StyledAlertTitle>
        <StyledAlertBtn
          data-test-id={`${dataName}-close-btn`}
          onClick={onCloseClick}
          size="small"
        >
          Close
        </StyledAlertBtn>
      </StyledAlertHeader>
      <Collapse in={isOpen}>
        <StyledAlertBody data-test-id={`${dataName}-body`}>{message}</StyledAlertBody>
      </Collapse>
      {lifetime !== null && (
        <StyledDisappearanceTimer
          color={type}
          role="progressbar"
          time={lifetime}
        />
      )}
    </StyledAlertContainer>
  );
};
