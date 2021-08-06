import * as React from 'react';
import classNames from 'clsx';
import * as PropTypes from 'prop-types';

export const TableDetailCell = ({
  colSpan, children, className,
  tableColumn, tableRow, row,
  refObject,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    ref={refObject}
    className={classNames('table-active', className)}
    {...restProps}
  >
    {children}
  </td>
);

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  refObject: PropTypes.object,
};

TableDetailCell.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined,
  refObject: undefined,
};
