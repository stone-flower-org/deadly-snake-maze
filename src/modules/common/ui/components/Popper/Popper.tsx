import { PopperProps as BasePopperProps } from '@mui/material';
import React, { FC, useMemo } from 'react';

import { DEFAULT_POPPER_PROPS } from './constants';
import { StyledPopper } from './styles';
import { makeFlipModifier, makeOffsetModifier, makePreventOverflowModifier, makeUpdateOnResizeModifier } from './utils';

export interface PopperProps extends BasePopperProps {
  'data-test-id'?: string;
  offset?: string;
  padding?: string;
  disableFlip?: boolean;
  preventOverflowContainer?: boolean;
  updateOnResize?: boolean;
}

export const Popper: FC<PopperProps> = ({
  'data-test-id': dataName = DEFAULT_POPPER_PROPS['data-test-id'],
  disableFlip = false,
  modifiers,
  offset,
  padding,
  preventOverflowContainer = false,
  updateOnResize,
  ...props
}: PopperProps) => {
  const allModifiers = useMemo(() => {
    const allModifiers = [...(modifiers ?? [])];

    if (offset) allModifiers.push(makeOffsetModifier(offset.split(' ').map(Number)));

    if (disableFlip) allModifiers.push(makeFlipModifier({ fallbackPlacements: [] }));

    if (preventOverflowContainer || padding) {
      const preventOverflow = makePreventOverflowModifier();
      if (props.container) preventOverflow.options.boundary = props.container as Element;
      if (padding) preventOverflow.options.padding = Number(padding);
      allModifiers.push(preventOverflow);
    }

    if (updateOnResize) allModifiers.push(makeUpdateOnResizeModifier());

    return allModifiers;
  }, [modifiers, offset, padding, disableFlip, props.container, preventOverflowContainer, updateOnResize]);

  return (
    <StyledPopper
      {...props}
      data-test-id={dataName}
      modifiers={allModifiers}
    />
  );
};
