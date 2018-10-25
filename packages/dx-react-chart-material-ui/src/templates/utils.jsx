import { withPatchedProps } from '@devexpress/dx-react-chart';
import { fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const getBorderColor = theme => (
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : theme.palette.divider
);

export const withClassName = (...args) => {
  const setClassName = ({ className, classes, ...restProps }) => ({
    className: classNames(classes.root, className),
    ...restProps,
  });
  // TODO: First candidate to `compose` util?
  return Target => withStyles(...args)(withPatchedProps(setClassName)(Target));
};
