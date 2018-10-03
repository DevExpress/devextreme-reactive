import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const StaticSpaceBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

StaticSpaceBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export const StaticSpace = withStyles(styles)(StaticSpaceBase, { name: 'StaticSpace' });
