import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';

const styles = {
  emptyCell: {
    display: 'none',
  },
};

const InvisibleCellBase = ({ classes }) => (
  <TableCell className={classes.emptyCell} />
);

InvisibleCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const InvisibleCell = withStyles(styles, { name: 'InvisibleCell' })(InvisibleCellBase);
