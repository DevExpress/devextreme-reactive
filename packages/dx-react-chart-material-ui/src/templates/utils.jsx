import { withPatchedProps } from '@devexpress/dx-react-chart';
import {
  darken, alpha, lighten, styled,
} from '@mui/material/styles';
import classNames from 'clsx';

export const getBorderColor = theme => (
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
);

const PREFIX = 'Target';

export const classes = {
  root: `${PREFIX}-root`,
};

export const withClassName = (...args) => {
  const setClassName = ({ className, ...restProps }) => ({
    className: classNames(classes.root, className),
    ...restProps,
  });
  // TODO: First candidate to `compose` util?
  return Target => styled(withPatchedProps(setClassName)(Target))(...args);
};
