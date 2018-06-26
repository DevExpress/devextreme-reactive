import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';

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
