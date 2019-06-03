import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  tableRef,
  classes, className,
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  formatDate,
  ...restProps
}) => (
  <RootRef rootRef={tableRef}>
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {cellsData.map((days, index) => (
          <Row key={index.toString()}>
            {days.map(({ startDate, endDate }) => (
              <Cell
                key={startDate}
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
  tableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
