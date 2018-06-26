import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    width: '320px',
    tableLayout: 'fixed',
  },
};

export const TableBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  classes,
  cells,
  ...restProps
}) => (
  <TableMUI
    className={classes.table}
    {...restProps}
  >
    <TableBody>
      {cells.map(row => (
        <Row
          key={`date_navigator_row_${row[0].value.toString()}`}
        >
          {row.map(({ value, isOtherMonth }) => (
            <Cell
              key={`date_navigator_cell_${value.toString()}`}
              otherMonth={isOtherMonth}
            >
              {moment(value).format('D')}
            </Cell>
          ))}
        </Row>
      ))}
    </TableBody>
  </TableMUI>
);

TableBase.propTypes = {
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
