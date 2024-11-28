import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import React, { FC, HTMLAttributes } from 'react';

import { DEFAULT_PROPS } from './constants';
import { LoadingSize } from './types';
import { calcSize } from './utils';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  'data-test-id'?: string;
  className?: string;
  color?: CircularProgressProps['color'];
  size?: LoadingSize;
  title?: string;
}

export const Loading: FC<LoadingProps> = ({
  'data-test-id': dataName = DEFAULT_PROPS['data-test-id'],
  color = DEFAULT_PROPS['color'],
  role = DEFAULT_PROPS.role,
  size = DEFAULT_PROPS.size,
  title = DEFAULT_PROPS.title,
  ...rest
}: LoadingProps) => (
  <CircularProgress
    {...rest}
    aria-label={title}
    color={color}
    data-test-id={dataName}
    role={role}
    size={calcSize(size)}
  />
);
