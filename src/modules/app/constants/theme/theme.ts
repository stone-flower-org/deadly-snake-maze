import { createTheme } from '@mui/material/styles';

import { colors } from './colors';
import { fonts } from './fonts';
import { globalStyles } from './global-styles';
import { typography } from './typography';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: [globalStyles, fonts].join('\n'),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    common: {
      ...colors,
    },
    mode: 'dark',
  },
  typography: {
    ...typography,
  },
});
