import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';

export const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

export const getStickyCellStyle = theme => ({
  backgroundColor: theme.palette.background.paper,
  position: 'sticky',
  zIndex: 300,
  backgroundClip: 'padding-box',
});
