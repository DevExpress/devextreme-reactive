import { darken, alpha, lighten } from '@mui/material/styles';

export const getBorder = theme => (`1px solid ${
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
}`);

export const getStickyStyles = theme => ({
  position: 'sticky',
  background: theme.palette.background.paper,
  zIndex: 500,
});

export const getStickyCellStyle = theme => ({
  ...getStickyStyles(theme),
  backgroundClip: 'padding-box',
});
