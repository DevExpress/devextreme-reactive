import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableSummaryItem = ({
  children, className, ...restProps
}) => (
  <div
    className={classNames('dx-g-bs4-table-summary-item', className)}
    {...restProps}
  >
    {children}
  </div>
);

TableSummaryItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TableSummaryItem.defaultProps = {
  className: undefined,
  children: undefined,
};
