import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableContainer = ({
  children,
  style,
  className,
  ...restProps
}) => (
  <div
    className={classNames('table-responsive', className)}
    style={{
      flexGrow: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      border: 0,
      margin: 0,
      // NOTE: fix sticky positioning in Safari
      width: '100%',
      flexDirection: 'column',
      ...style,
    }}
    {...restProps}
  >
    <div>
      {children}
    </div>
  </div>
);

TableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

TableContainer.defaultProps = {
  className: undefined,
  style: null,
};
