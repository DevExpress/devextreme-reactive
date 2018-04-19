import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableContainer = ({
  children, style, className,
  ...restProps
}) => (
  <div
    className={classNames('table-responsive', className)}
    {...restProps}
    style={{
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      border: 0,
      ...style,
    }}
  >
    {children}
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
