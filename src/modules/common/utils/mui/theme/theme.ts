import { PaletteColor, Theme } from '@mui/material/styles';
import { isKeyOf } from '@stone-flower-org/js-utils';
import { CSSProperties } from 'react';

export const getColorFromTheme = (theme: Theme, color: string): CSSProperties['color'] => {
  if (isKeyOf(theme.palette, color) && isKeyOf(theme.palette[color], 'main'))
    return (theme.palette[color] as PaletteColor).main;
  if (color === 'text') return theme.palette.text.primary;
  return color;
};
