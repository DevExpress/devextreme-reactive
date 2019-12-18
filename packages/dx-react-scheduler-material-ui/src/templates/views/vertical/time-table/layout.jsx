import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { cellsMeta, getWidthInPixels, getViewCellKey } from '../../../utils';
import {
  CELL_WIDTH, SMALL_CELL_WIDTH,
  XS_CELL_WIDTH, SMALL_LAYOUT_MEDIA_QUERY, LAYOUT_MEDIA_QUERY,
} from '../../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    minWidth: cellsNumber => getWidthInPixels(cellsNumber, CELL_WIDTH),
    [`${LAYOUT_MEDIA_QUERY}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, SMALL_CELL_WIDTH),
    },
    [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, XS_CELL_WIDTH),
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
              startDate, endDate, hasRightBorder, groupingInfo,
            }) => (
              <Cell
                key={getViewCellKey(startDate, groupingInfo)}
                startDate={startDate}
                endDate={endDate}
                hasRightBorder={hasRightBorder}
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
