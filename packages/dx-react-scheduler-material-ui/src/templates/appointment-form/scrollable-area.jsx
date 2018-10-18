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

const ScrollableAreaBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

ScrollableAreaBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ScrollableAreaBase.defaultProps = {
  className: undefined,
};

export const ScrollableArea = withStyles(styles)(ScrollableAreaBase, { name: 'ScrollableArea' });
