import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TableDetailCell = ({
  colSpan,
  style,
  children,
  className,
  tableColumn, tableRow, row,
  ...restProps
}) => (
  <td
    style={style}
    colSpan={colSpan}
    className={classNames('active', className)}
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
  row: PropTypes.object,
};

TableDetailCell.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined,
};
