import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS } from '@devexpress/dx-scheduler-core';

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
            const key = formatDate(cell.startDate, WEEK_DAY_OPTIONS);
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
                  {formatDate(startDate, DAY_OPTIONS)}
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
  // oneOfType is a workaround because withStyles returns react object
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerRowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cells: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
  formatDate: PropTypes.func.isRequired,
  headerCells: PropTypes.array,
  className: PropTypes.string,
  onCellClick: PropTypes.func,
};

TableBase.defaultProps = {
  className: undefined,
  headerCells: [],
  onCellClick: () => {},
  selectedDate: undefined,
};

export const Table = withStyles(styles, { name: 'Table' })(TableBase);
