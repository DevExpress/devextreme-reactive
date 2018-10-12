import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  dateTableRef,
  classes, className,
  cellComponent: Cell,
  rowComponent: Row,
  viewCellsData,
  ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {viewCellsData.map((days, index) => (
          <Row key={index.toString()}>
            {days.map(({ startDate, endDate }) => (
              <Cell
                key={startDate.toString()}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  </RootRef>
);

LayoutBase.propTypes = {
  dateTableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  viewCellsData: PropTypes.arrayOf(Array).isRequired,
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
