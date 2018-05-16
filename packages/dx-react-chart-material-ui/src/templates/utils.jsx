import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';

export const getBorderColor = theme => (
  theme.palette.type !== 'light'
    ? darken(fade(theme.palette.divider, 1), 0.88)
    : lighten(fade(theme.palette.divider, 1), 0.8)
);
