import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
};

const TableContainerBase = ({
  children, classes, ...restProps
}) => (
  <div
    className={classes.root}
    {...restProps}
  >
    {children}
  </div>
);

TableContainerBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
};

export const TableContainer = withStyles(styles, { name: 'TableContainer' })(TableContainerBase);
