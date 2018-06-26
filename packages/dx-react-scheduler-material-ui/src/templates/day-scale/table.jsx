import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

export const Table = ({
  children,
  ...restProps
}) => (
  <TableMUI
    {...restProps}
    style={{ tableLayout: 'fixed' }}
  >
    <TableHead>
      {children}
    </TableHead>
  </TableMUI>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
};
