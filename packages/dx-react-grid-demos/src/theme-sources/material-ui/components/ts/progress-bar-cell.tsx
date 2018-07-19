import { Table } from '@devexpress/dx-react-grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import * as React from 'react';

type ProgressBarCellProps = Table.DataCellProps & WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
  progressBar: {
    backgroundColor: theme.palette.primary.light,
    float: 'left',
    height: theme.spacing.unit,
  },
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

export const ProgressBarCell = withStyles(styles, { name: 'ProgressBarCell' })(
  ({ value, classes }: ProgressBarCellProps) => {
    const percent = value * 100;
    return (
      <TableCell
        className={classes.progressBarCell}
      >
        <div
          className={classes.progressBar}
          style={{ width: `${percent}%` }}
          title={`${percent.toFixed(1)}%`}
        />
      </TableCell>
    );
  }
);
