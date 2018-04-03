import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = {
  emptyCell: {
    display: 'none',
  },
};

const EmptyCellBase = ({ classes }) => (
  <TableCell className={classes.emptyCell} />
);

EmptyCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const InvisibleCell = withStyles(styles, { name: 'InvisibleCell' })(EmptyCellBase);
