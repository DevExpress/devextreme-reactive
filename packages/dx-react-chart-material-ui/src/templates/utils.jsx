import { withPatchedProps } from '@devexpress/dx-react-chart';
import { darken, alpha, lighten } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

export const getBorderColor = theme => (
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
);

export const withClassName = (...args) => {
  const setClassName = ({ className, classes, ...restProps }) => ({
    className: classNames(classes.root, className),
    ...restProps,
  });
  // TODO: First candidate to `compose` util?
  return Target => withStyles(...args)(withPatchedProps(setClassName)(Target));
};
