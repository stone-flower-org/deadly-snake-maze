import { Theme } from '@mui/material';

import { getColorFromTheme } from './theme';

const color = 'red';

describe('getColorFromTheme', () => {
  it('should return given color when theme has no such PaletteColor', () => {
    expect(getColorFromTheme({ palette: {} } as Theme, color)).toBe(color);
    expect(getColorFromTheme({ palette: { red: {} } } as unknown as Theme, color)).toBe(color);
  });

  it('should return PaletteColor color by given color name', () => {
    const colorVal = '#f00';
    expect(getColorFromTheme({ palette: { red: { main: colorVal } } } as unknown as Theme, color)).toBe(colorVal);
  });
});
