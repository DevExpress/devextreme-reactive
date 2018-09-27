import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Cell = ({
  column, children, leftBorder,
  tableRow, tableColumn, row,
  className, ...restProps
}) => (
  <th
    className={classNames({
      'dx-g-bs4-banded-cell dx-g-bs4-table-cell text-nowrap border-right': true,
      'border-left': leftBorder,
    }, className)}
    {...restProps}
  >
    {children}
  </th>
);

Cell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  leftBorder: PropTypes.bool,
};

Cell.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  leftBorder: false,
};
