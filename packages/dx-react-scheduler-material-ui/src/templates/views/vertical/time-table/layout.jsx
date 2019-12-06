import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { cellsMeta, getMinWidth } from '../../../utils';
import {
  MIN_CELL_WIDTH, LARGE_MOBILE_MIN_CELL_WIDTH,
  MIN_CELL_WIDTH_MOBILE, MOBILE_LAYOUT_QUERY, LARGE_MOBILE_LAYOUT_QUERY,
} from '../../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    minWidth: cellsNumber => getMinWidth(cellsNumber, MIN_CELL_WIDTH),
    [`${LARGE_MOBILE_LAYOUT_QUERY}`]: {
      minWidth: cellsNumber => getMinWidth(cellsNumber, LARGE_MOBILE_MIN_CELL_WIDTH),
    },
    [`${MOBILE_LAYOUT_QUERY}`]: {
      minWidth: cellsNumber => getMinWidth(cellsNumber, MIN_CELL_WIDTH_MOBILE),
    },
    width: '100%',
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
            {days.map(({
              startDate, endDate, isLastHorizontalGroupCell, groupingInfo,
            }) => (
              <Cell
                // key={Math.random()}
                startDate={startDate}
                endDate={endDate}
                isLastHorizontalGroupCell={isLastHorizontalGroupCell}
                groupingInfo={groupingInfo}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
});

Layout.propTypes = {
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
