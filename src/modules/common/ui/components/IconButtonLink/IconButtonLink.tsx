import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface IconButtonLinkProps extends Omit<MuiIconButtonProps<typeof RouterLink>, 'component'> {}

// TODO: add to react-template
export const IconButtonLink = (props: IconButtonLinkProps) => (
  <MuiIconButton
    component={RouterLink}
    {...props}
  />
);
