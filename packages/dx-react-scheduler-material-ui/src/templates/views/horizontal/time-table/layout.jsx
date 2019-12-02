import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import { cellsMeta } from '../../../utils';
import { minCellWidth } from '../../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    width: cellNumber => `${cellNumber * minCellWidth}px`,
  },
});

export const Layout = React.memo(({
  setCellElementsMeta,
  cellComponent: Cell,
  rowComponent: Row,
  className,
  cellsData,
  formatDate,
  ...restProps
}) => {
  const table = React.useRef(null);
  React.useEffect(() => {
    setCellElementsMeta(cellsMeta(table.current));
  });
  const classes = useStyles(cellsData[0].length);

  return (
    <TableMUI
      ref={table}
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {cellsData.map(row => (
          <Row key={row[0].startDate.toString()}>
            {row.map(({
              startDate,
              endDate,
              today,
              otherMonth,
              isLastHorizontalGroupCell,
            }) => (
              <Cell
                key={Math.random()}
                startDate={startDate}
                endDate={endDate}
                today={today}
                otherMonth={otherMonth}
                formatDate={formatDate}
                isLastHorizontalGroupCell={isLastHorizontalGroupCell}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </TableMUI>
  );
});

Layout.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: undefined,
};
