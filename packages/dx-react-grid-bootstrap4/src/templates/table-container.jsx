import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableContainer = React.forwardRef(({
  children, className, style, ...restProps
}, ref) => (
  <div
    ref={ref}
    className={classNames('table-responsive dx-g-bs4-table-container', className)}
    style={{
      msOverflowStyle: 'auto',
      ...style,
    }}
    {...restProps}
  >
    <div>
      {children}
    </div>
  </div>
));

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableContainer.defaultProps = {
  className: undefined,
  style: null,
};
