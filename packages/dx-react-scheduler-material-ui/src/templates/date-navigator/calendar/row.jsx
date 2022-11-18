import * as React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

export const Row = ({
  children,
  ...restProps
}) => (
  <TableRow
    {...restProps}
  >
    {children}
  </TableRow>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};
