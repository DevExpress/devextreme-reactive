import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';

const weekDay = { weekday: 'short' };
const day = { day: 'numeric' };

const styles = {
  table: {
    width: '320px',
    tableLayout: 'fixed',
  },
};

const TableBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  headerRowComponent: HeaderRow,
  headerCellComponent: HeaderCell,
  classes,
  className,
  cells,
  headerCells,
  selectedDate,
  onCellClick,
  formatDate,
  ...restProps
}) => {
  const comparableSelectedDate = moment(selectedDate);
  return (
    <TableMUI
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableHead>
        <HeaderRow>
          {headerCells.map((cell) => {
            const key = formatDate(cell.startDate, weekDay);
            return (
              <HeaderCell
                key={key}
              >
                {key}
              </HeaderCell>
            );
          })}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {cells.map(row => (
          <Row
            key={row[0].startDate.toString()}
          >
            {row.map(({
              startDate,
              otherMonth,
              today,
            }) => {
              const selected = comparableSelectedDate.isSame(moment(startDate), 'date');
              return (
                <Cell
                  key={startDate.toString()}
                  otherMonth={otherMonth}
                  selected={selected}
                  today={today}
                  onClick={() => {
                    onCellClick(startDate);
                  }}
                >
                  {formatDate(startDate, day)}
                </Cell>
              );
            })}
          </Row>
        ))}
      </TableBody>
    </TableMUI>
  );
};

TableBase.propTypes = {
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
  headerCells: PropTypes.array,
  className: PropTypes.string,
  onCellClick: PropTypes.func,
  formatDate: PropTypes.func,
};

TableBase.defaultProps = {
  className: undefined,
  headerCells: [],
  onCellClick: () => {},
  formatDate: () => '',
  selectedDate: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
