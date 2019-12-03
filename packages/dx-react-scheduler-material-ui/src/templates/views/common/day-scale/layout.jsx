import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import { MIN_CELL_WIDTH } from '../../../constants';
import { getMinWidth } from '../../../utils';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    minWidth: cellsNumber => getMinWidth(cellsNumber, MIN_CELL_WIDTH),
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
            isLastHorizontalGroupCell,
          }, index) => (
            <Cell
              key={index.toString()}
              startDate={startDate}
              endDate={endDate}
              today={today}
              formatDate={formatDate}
              isLastHorizontalGroupCell={isLastHorizontalGroupCell}
            />
          ))}
        </Row>
      </TableBody>
    </TableMUI>
  );
};

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  groupingPanelComponent: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Layout.defaultProps = {
  className: undefined,
  groupingPanelComponent: () => null,
};
