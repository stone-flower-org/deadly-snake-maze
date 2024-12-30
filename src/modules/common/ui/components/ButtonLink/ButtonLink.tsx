import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface ButtonLinkProps extends Omit<MuiButtonProps<typeof RouterLink>, 'component'> {}

// TODO: add to react-template
export const ButtonLink = (props: ButtonLinkProps) => (
  <MuiButton
    component={RouterLink}
    {...props}
  />
);
