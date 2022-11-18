import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableContainer = ({
  children,
  style,
  className,
  forwardedRef,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
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
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableContainer.defaultProps = {
  className: undefined,
  style: null,
  forwardedRef: undefined,
};
