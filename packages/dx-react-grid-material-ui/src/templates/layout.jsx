import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const RootBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  className: undefined,
};

export const Root = withStyles(styles)(RootBase);
