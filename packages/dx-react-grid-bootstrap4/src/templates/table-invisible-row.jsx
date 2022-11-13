import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { TableRow } from './table-row';

export const TableInvisibleRow = ({ className, ...restParams }) => (
  <TableRow
    className={classNames('dx-g-bs4-table-invisible-row', className)}
    {...restParams}
  />
);

TableInvisibleRow.propTypes = {
  className: PropTypes.string,
};

TableInvisibleRow.defaultProps = {
  className: undefined,
};
