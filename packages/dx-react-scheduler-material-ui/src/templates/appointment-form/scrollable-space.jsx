import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    maxHeight: theme.spacing.unit * 50,
    overflowY: 'scroll',
    padding: theme.spacing.unit * 2,
    paddingBottom: 0,
  },
});

const ScrollableSpaceBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

ScrollableSpaceBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ScrollableSpaceBase.defaultProps = {
  className: undefined,
};

export const ScrollableSpace = withStyles(styles)(ScrollableSpaceBase, { name: 'ScrollableSpace' });
