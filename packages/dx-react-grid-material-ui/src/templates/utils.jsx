import { darken, alpha, lighten } from '@mui/material';

export const getBorder = theme => (`1px solid ${theme.palette.mode === 'light'
  ? lighten(alpha(theme.palette.divider, 1), 0.88)
  : darken(alpha(theme.palette.divider, 1), 0.68)
}`);

export const getStickyStyles = (theme, zIndex = 300) => ({
  position: 'sticky',
  background: theme.palette.background.paper,
  zIndex,
});

export const getStickyCellStyle = theme => ({
  ...getStickyStyles(theme),
  backgroundClip: 'padding-box',
});
