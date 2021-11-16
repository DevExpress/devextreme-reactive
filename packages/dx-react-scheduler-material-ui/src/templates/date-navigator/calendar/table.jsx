import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { WEEK_DAY_OPTIONS, DAY_OPTIONS, areDatesSame } from '@devexpress/dx-scheduler-core';

const PREFIX = 'Table';

export const classes = {
  table: `${PREFIX}-table`,
};

const StyledTableMUI = styled(TableMUI)({
  [`&.${classes.table}`]: {
    width: '320px',
    tableLayout: 'fixed',
  },
});

export const Table = ({
  rowComponent: Row,
  cellComponent: Cell,
  headerRowComponent: HeaderRow,
  headerCellComponent: HeaderCell,
  className,
  cells,
  headerCells,
  selectedDate,
  onCellClick,
  formatDate,
  ...restProps
}) => (
  <StyledTableMUI
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
            const selected = areDatesSame(selectedDate, startDate);
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
  </StyledTableMUI>
);

Table.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerRowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cells: PropTypes.array.isRequired,
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

Table.defaultProps = {
  className: undefined,
  headerCells: [],
  onCellClick: () => {},
  selectedDate: undefined,
};
