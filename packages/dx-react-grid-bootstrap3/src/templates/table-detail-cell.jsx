import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TableDetailCell = ({
  colSpan,
  style,
  template,
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
    {template()}
  </td>
);

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  template: PropTypes.func.isRequired,
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
};
