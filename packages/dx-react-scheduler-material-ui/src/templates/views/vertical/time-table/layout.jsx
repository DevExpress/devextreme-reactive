import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = React.memo(({
  cellComponent: Cell,
  rowComponent: Row,
  classes,
  className,
  cellsData,
  formatDate,
  tableRef,
  setCellElements,
  ...restProps
}) => (
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
));

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  tableRef: PropTypes.object.isRequired,
  setCellElements: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
