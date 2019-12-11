import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import {
  CELL_WIDTH, SMALL_CELL_WIDTH,
  XS_CELL_WIDTH, XS_LAYOUT, SMALL_LAYOUT,
} from '../../../constants';
import { getWidthInPixels } from '../../../utils';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    minWidth: cellsNumber => getWidthInPixels(cellsNumber, CELL_WIDTH),
    [`${SMALL_LAYOUT}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, SMALL_CELL_WIDTH),
    },
    [`${XS_LAYOUT}`]: {
      minWidth: cellsNumber => getWidthInPixels(cellsNumber, XS_CELL_WIDTH),
    },
    width: '100%',
  },
});

export const Layout = ({
  cellComponent: Cell,
  rowComponent: Row,
  groupingPanelComponent: GroupingPanel,
  cellsData,
  className,
  formatDate,
  ...restProps
}) => {
  const classes = useStyles(cellsData[0].length);
  return (
    <TableMUI
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        <GroupingPanel />
        <Row>
          {cellsData[0].map(({
            startDate,
            endDate,
            today,
            isBorderRight,
            groupingInfo,
          }, index) => (
            <Cell
              key={index.toString()}
              startDate={startDate}
              endDate={endDate}
              today={today}
              formatDate={formatDate}
              isBorderRight={isBorderRight}
              groupingInfo={groupingInfo}
            />
          ))}
        </Row>
      </TableBody>
    </TableMUI>
  );
};

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Layout.defaultProps = {
  className: undefined,
  groupingPanelComponent: () => null,
};
