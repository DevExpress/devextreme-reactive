import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    // tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  groupingPanelComponent: GroupingPanel,
  cellsData,
  className,
  classes,
  formatDate,
  ...restProps
}) => (
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

LayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
  groupingPanelComponent: () => null,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
