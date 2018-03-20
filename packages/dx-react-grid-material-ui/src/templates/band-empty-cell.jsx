import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

const styles = {
  emptyCell: {
    display: 'none',
  },
};

const BandEmptyCellBase = ({ classes }) => (
  <TableCell className={classes.emptyCell} />
);

BandEmptyCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const BandEmptyCell = withStyles(styles, { name: 'BandEmptyCell' })(BandEmptyCellBase);
