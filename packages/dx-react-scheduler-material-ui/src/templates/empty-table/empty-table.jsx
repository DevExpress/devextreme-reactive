import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { getBorderColor } from '../utils';

const styles = theme => ({
  cell: {
    borderRight: getBorderColor(theme),
  },
});

export const EmptyTableBase = ({
  classes,
  ...restProps
}) => (
  <TableMUI
    {...restProps}
  >
    <TableHead>
      <TableRow>
        <TableCell className={classes.cell} />
      </TableRow>
    </TableHead>
  </TableMUI>
);

EmptyTableBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const EmptyTable = withStyles(styles, { name: 'EmptyTable' })(EmptyTableBase);
