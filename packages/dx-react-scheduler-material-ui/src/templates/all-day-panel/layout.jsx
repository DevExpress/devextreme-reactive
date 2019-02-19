import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
  wrapper: {
    position: 'relative',
  },
};

const LayoutBase = ({
  children,
  cellsData,
  allDayPanelRef,
  classes, className,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <RootRef rootRef={allDayPanelRef}>
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableHead>
        <Row>
          {cellsData.map(({
            startDate,
            endDate,
          }) => (
            <Cell
              key={startDate}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
        </Row>
      </TableHead>
    </Table>
  </RootRef>
);

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  allDayPanelRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
  cellComponent: () => null,
  rowComponent: () => null,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
