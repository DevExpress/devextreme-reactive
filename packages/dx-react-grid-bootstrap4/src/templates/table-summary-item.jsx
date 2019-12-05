import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableSummaryItem = ({
  children,
  type,
  value,
  getMessage,
  className,
  tagName: Tag,
  ...restProps
}) => (
  <Tag
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
  </Tag>
);

TableSummaryItem.propTypes = {
  tagName: PropTypes.string,
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

TableSummaryItem.defaultProps = {
  tagName: 'div',
  value: null,
  className: undefined,
  children: undefined,
};
