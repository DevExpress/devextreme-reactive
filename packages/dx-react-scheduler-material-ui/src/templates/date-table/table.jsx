import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

export const Table = ({
  children, dateTableRef,
  ...restProps
}) => (
  <TableMUI
    id="date-table"
    ref={dateTableRef}
    {...restProps}
    style={{ tableLayout: 'fixed' }}
  >
    <TableBody>
      {children}
    </TableBody>
  </TableMUI>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
  dateTableRef: PropTypes.func.isRequired,
};
