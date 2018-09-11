import { patchProps } from '@devexpress/dx-react-chart';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const getBorderColor = theme => (
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.8)
);

export const addStyleClassName = (styles) => {
  const setClassName = ({ className, classes, ...restProps }) => ({
    ...restProps,
    className: classNames(classes.root, className),
  });
  return withStyles(styles)(patchProps(setClassName));
};
