import { ClickAwayListener } from '@mui/material';
import React, {
  FC,
  HTMLProps,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  cloneElement,
  useRef,
  useState,
} from 'react';

import { useControlledState } from '@/src/modules/common/ui/hooks';

import { Popper, PopperProps } from './Popper';
import { DEFAULT_POPPER_CARD_PROPS } from './constants';
import { StyledContent } from './styles';

export interface PopperCardProps {
  'data-test-id'?: string;
  children?: ReactNode;
  button: ReactElement<HTMLProps<HTMLElement>>;
  open?: boolean;
  onChange?: (open: boolean) => void;
  PopperProps?: Partial<Omit<PopperProps, 'anchorEl' | 'open'>>;
}

export const PopperCard: FC<PopperCardProps> = ({
  'data-test-id': dataName = DEFAULT_POPPER_CARD_PROPS['data-test-id'],
  button,
  children,
  open = false,
  onChange,
  PopperProps,
}: PopperCardProps) => {
  const { state: isOpen, updateState: updateOpen } = useControlledState({
    state: open,
    onChange,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const contentRef = useRef<HTMLElement | null>(null);

  const showPopper = !!anchorEl;

  function onButtonClick(e: ReactMouseEvent<HTMLElement>) {
    button.props.onClick && button.props.onClick(e);
    updateOpen(!isOpen);
  }

  function onClose(e: MouseEvent | TouchEvent) {
    if (e.target && contentRef.current?.contains(e.target as HTMLElement)) return;
    updateOpen(false);
  }

  return (
    <>
      <ClickAwayListener onClickAway={onClose}>
        {cloneElement(button, {
          onClick: onButtonClick,
          ref: setAnchorEl,
        })}
      </ClickAwayListener>
      {showPopper && (
        <Popper
          {...PopperProps}
          anchorEl={anchorEl}
          data-test-id={dataName}
          open={isOpen}
        >
          <StyledContent ref={contentRef}>{children}</StyledContent>
        </Popper>
      )}
    </>
  );
};
