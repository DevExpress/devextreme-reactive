import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSummaryItem = ({
  children,
  type,
  value,
  getMessage,
  className,
  ...restProps
}) => (
  <div
    className={classNames('dx-g-bs4-table-summary-item', className)}
    {...restProps}
  >
    {
      <>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </>
    }
  </div>
);

TableSummaryItem.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

TableSummaryItem.defaultProps = {
  value: null,
  className: undefined,
  children: undefined,
};
