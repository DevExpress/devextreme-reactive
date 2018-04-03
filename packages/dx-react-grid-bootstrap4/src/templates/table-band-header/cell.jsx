import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './../table-cell.css';
import './cell.css';

export const Cell = ({
  column, children,
  tableRow, tableColumn, row,
  className, ...restProps
}) => (
  <th
    className={classNames('dx-rg-bs4-banded-cell dx-rg-bs4-table-cell text-nowrap border', className)}
    {...restProps}
  >
    {children}
  </th>
);

Cell.propTypes = {
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

Cell.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};
