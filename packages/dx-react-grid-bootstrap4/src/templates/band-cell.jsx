import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './table-cell.css';

export const BandCell = ({
  column, value, children,
  tableRow, tableColumn, row,
  className, ...restProps
}) => (
  <th
    className={classNames({
      'text-nowrap dx-rg-bs4-table-cell border-bottom border-left border-top-0': true,
      'text-right': tableColumn && tableColumn.align === 'right',
      'text-center': tableColumn && tableColumn.align === 'center',
    }, className)}
    {...restProps}
  >
    {children || value}
  </th>
);

BandCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

BandCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};
