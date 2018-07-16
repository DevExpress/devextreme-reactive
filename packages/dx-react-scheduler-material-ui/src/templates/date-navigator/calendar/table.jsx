import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
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
  headerRowComponent: HeaderRow,
  headerCellComponent: HeaderCell,
  classes,
  className,
  cells,
  headerCells,
  onCellClick,
  ...restProps
}) => (
  <TableMUI
    className={classNames(classes.table, className)}
    {...restProps}
  >
    <TableHead>
      <HeaderRow>
        {headerCells.map((cell) => {
          const value = moment(cell).format('ddd');
          return (
            <HeaderCell
              key={`header_${value}`}
            >
              {value}
            </HeaderCell>
          );
        })}
      </HeaderRow>
    </TableHead>
    <TableBody>
      {cells.map(row => (
        <Row
          key={`calendar_row_${row[0].value.toString()}`}
        >
          {row.map(({ value, isOtherMonth, isCurrent }) => (
            <Cell
              key={`calendar_cell_${value.toString()}`}
              otherMonth={isOtherMonth}
              current={isCurrent}
              onClick={() => {
                onCellClick({ nextDate: value });
              }}
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
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  headerCells: PropTypes.array,
  className: PropTypes.string,
  onCellClick: PropTypes.func,
};

TableBase.defaultProps = {
  className: undefined,
  headerCells: [],
  onCellClick: () => {},
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
