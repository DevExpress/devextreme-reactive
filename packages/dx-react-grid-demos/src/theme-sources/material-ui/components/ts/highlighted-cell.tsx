import { Table } from '@devexpress/dx-react-grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import * as React from 'react';

const getColor = (amount: number) => {
  if (amount < 3000) {
    return '#F44336';
  }
  if (amount < 5000) {
    return '#FFC107';
  }
  if (amount < 8000) {
    return '#FF5722';
  }
  return '#009688';
};

const styles = (theme: Theme) => createStyles({
  highlightedCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

type HighlightedCellProps = Table.DataCellProps & WithStyles<typeof styles>;

export const HighlightedCell = withStyles(styles, { name: 'HighlightedCell' })(
  ({
    tableColumn, value, classes, children,
  } : HighlightedCellProps) => (
    <TableCell
      className={classes.highlightedCell}
      style={{
        color: getColor(value),
        textAlign: tableColumn.align,
      }}
    >
      {children}
    </TableCell>
  )
);
