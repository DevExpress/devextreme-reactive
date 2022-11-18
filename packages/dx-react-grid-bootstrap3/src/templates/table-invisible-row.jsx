import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from './table-row';

export const TableInvisibleRow = ({ style, ...restParams }) => (
  <TableRow
    style={{
      visibility: 'hidden',
      ...style,
    }}
    {...restParams}
  />
);

TableInvisibleRow.propTypes = {
  style: PropTypes.object,
};

TableInvisibleRow.defaultProps = {
  style: null,
};
