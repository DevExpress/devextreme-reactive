import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
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
    <Table
      ref={table}
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {cellsData.map((days, index) => (
          <Row key={index.toString()}>
            {days.map(({ startDate, endDate, isLastHorizontalGroupCell }) => (
              <Cell
                // key={Math.random()}
                startDate={startDate}
                endDate={endDate}
                isLastHorizontalGroupCell={isLastHorizontalGroupCell}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
});

Layout.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  classes: PropTypes.object.isRequired,
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
