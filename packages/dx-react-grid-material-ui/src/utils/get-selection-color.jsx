import { darken, alpha, lighten } from '@mui/material/styles';

export default theme => (
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.action.selected, 1), 0.96)
    : darken(alpha(theme.palette.action.selected, 1), 0.68)
);
