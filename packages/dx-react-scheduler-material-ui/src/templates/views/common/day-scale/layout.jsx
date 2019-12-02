import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import { minCellWidth } from '../../../constants';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed',
    width: width => `${width * minCellWidth}px`,
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
  // oneOfType is a workaround because withStyles returns react object
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Layout.defaultProps = {
  className: undefined,
  groupingPanelComponent: () => null,
};

// export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
