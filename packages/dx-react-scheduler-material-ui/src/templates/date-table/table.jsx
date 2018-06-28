import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';

export const Table = ({ children, dateTableRef, ...restProps }) => (
  <RootRef rootRef={dateTableRef}>
    <TableMUI
      {...restProps}
      style={{ tableLayout: 'fixed' }}
    >
      <TableBody>
        {children}
      </TableBody>
    </TableMUI>
  </RootRef>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
  dateTableRef: PropTypes.func.isRequired,
};
