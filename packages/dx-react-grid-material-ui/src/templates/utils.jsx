import { darken, fade, lighten } from 'material-ui/styles/colorManipulator';

export const getBorderColor = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.8)
}`);
