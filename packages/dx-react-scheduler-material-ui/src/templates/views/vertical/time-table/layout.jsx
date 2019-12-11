import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { cellsMeta, getMinWidth, getViewCellKey } from '../../../utils';
import {
  CELL_WIDTH, SMALL_CELL_WIDTH,
  XS_CELL_WIDTH, XS_LAYOUT, SMALL_LAYOUT,
} from '../../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    minWidth: cellsNumber => getMinWidth(cellsNumber, CELL_WIDTH),
    [`${SMALL_LAYOUT}`]: {
      minWidth: cellsNumber => getMinWidth(cellsNumber, SMALL_CELL_WIDTH),
    },
    [`${XS_LAYOUT}`]: {
      minWidth: cellsNumber => getMinWidth(cellsNumber, XS_CELL_WIDTH),
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
              startDate, endDate, isBorderRight, groupingInfo,
            }) => (
              <Cell
                key={getViewCellKey(startDate, groupingInfo)}
                startDate={startDate}
                endDate={endDate}
                isBorderRight={isBorderRight}
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
