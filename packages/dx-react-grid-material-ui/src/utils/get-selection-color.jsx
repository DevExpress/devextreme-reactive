import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';

export default theme => (
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.action.selected, 1), 0.96)
    : darken(fade(theme.palette.action.selected, 1), 0.68)
);
