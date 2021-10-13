import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    // NOTE: fix sticky positioning in Safari
    width: '100%',
  },
};

const TableContainerBase = ({
  children,
  classes,
  className,
  forwardedRef,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <div>
      {children}
    </div>
  </div>
);

TableContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableContainerBase.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};

export const TableContainer = withStyles(styles, { name: 'TableContainer' })(TableContainerBase);
