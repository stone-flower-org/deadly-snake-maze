import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps extends Omit<MuiLinkProps<typeof RouterLink>, 'component'> {}

// TODO: add to react-template
export const Link = (props: LinkProps) => (
  <MuiLink
    component={RouterLink}
    {...props}
  />
);
