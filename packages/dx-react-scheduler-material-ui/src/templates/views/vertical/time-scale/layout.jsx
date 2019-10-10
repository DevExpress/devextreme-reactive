import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  classes,
  className,
  formatDate,
  ...restProps
}) => (
  <Table {...restProps} className={classNames(classes.table, className)}>
    <TableBody>
      {cellsData.map((days, index) => (
        <Row key={days[0].startDate}>
          {index % 2
            ? null
            : (
              <Cell
                rowSpan="2"
                startDate={days[0].startDate}
                endDate={days[0].endDate}
                formatDate={formatDate}
              />
            )}
        </Row>
      ))}
    </TableBody>
  </Table>
);

LayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
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
