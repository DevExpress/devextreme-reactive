import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const Cell = ({
  column, children, beforeBorder,
  tableRow, tableColumn, row,
  refObject,
  className, ...restProps
}) => (
  <th
    className={classNames({
      'dx-g-bs4-banded-cell dx-g-bs4-table-cell text-nowrap border-right': true,
      'border-left': beforeBorder,
    }, className)}
    ref={refObject}
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
  beforeBorder: PropTypes.bool,
  refObject: PropTypes.object,
};

Cell.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  beforeBorder: false,
  refObject: undefined,
};
