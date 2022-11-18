import * as React from 'react';
import classNames from 'clsx';
import PropTypes from 'prop-types';

export const TableDetailCell = ({
  colSpan,
  children,
  className,
  tableColumn, tableRow, row,
  forwardedRef,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    ref={forwardedRef}
    className={classNames('active', className)}
    {...restProps}
  >
    {children}
  </td>
);

TableDetailCell.propTypes = {
  colSpan: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};

TableDetailCell.defaultProps = {
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined,
  forwardedRef: undefined,
};
