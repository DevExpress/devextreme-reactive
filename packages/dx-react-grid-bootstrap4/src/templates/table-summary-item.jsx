import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

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
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </div>
);

TableSummaryItem.propTypes = {
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

TableSummaryItem.defaultProps = {
  className: undefined,
  children: undefined,
};
