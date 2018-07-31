import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
};

const TableContainerBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </div>
);

TableContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableContainerBase.defaultProps = {
  className: undefined,
};

export const TableContainer = withStyles(styles, { name: 'TableContainer' })(TableContainerBase);
