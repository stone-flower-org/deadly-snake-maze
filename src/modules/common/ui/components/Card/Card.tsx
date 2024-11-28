import { Card as BaseCard, CardProps as BaseCardProps } from '@mui/material';
import React, { forwardRef } from 'react';

export interface CardProps extends BaseCardProps {}

export const Card = forwardRef((props: CardProps, ref: CardProps['ref']) => (
  <BaseCard
    {...props}
    ref={ref}
  />
));

Card.displayName = 'Card';
