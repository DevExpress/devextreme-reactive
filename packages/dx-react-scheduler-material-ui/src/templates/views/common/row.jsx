import * as React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@mui/material';

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
  children: PropTypes.node,
};

Row.defaultProps = {
  children: null,
};
