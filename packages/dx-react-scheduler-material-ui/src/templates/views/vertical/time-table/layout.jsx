import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TimeTableContainer } from '../../common/time-table/layout-container';

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
  <TimeTableContainer
    tableRef={tableRef}
    setCellElements={setCellElements}
  >
    <Table
      ref={tableRef}
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
  </TimeTableContainer>
));

LayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  tableRef: PropTypes.object.isRequired,
  setCellElements: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
