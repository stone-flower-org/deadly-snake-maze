import { CSSProperties } from 'react';

import '@mui/material/styles';
import '@mui/material/styles/createPalette';
import '@mui/material/Button';
import '@mui/material/Checkbox';
import '@mui/material/IconButton';
import '@mui/material/Typography';
import '@mui/material/SvgIcon';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    black?: CSSProperties['color'];
  }

  // interface PaletteOptions {}
}

declare module '@mui/material/styles' {
  // interface TypographyVariants {}
  // type TypographyVariantsOptions = TypographyVariants;
}

declare module '@mui/material/Typography' {
  // export { TypographyVariants } from '@mui/material/styles';
  // type TypographyPropsVariantOverrides = Record<keyof TypographyVariants, true>;
}
