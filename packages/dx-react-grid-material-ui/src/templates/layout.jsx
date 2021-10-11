import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const RootBase = ({
  children, classes, className, rootRef, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    ref={rootRef}
    {...restProps}
  >
    {children}
  </div>
);

RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  rootRef: PropTypes.object,
};

RootBase.defaultProps = {
  className: undefined,
  rootRef: undefined,
};

export const Root = withStyles(styles)(RootBase);
