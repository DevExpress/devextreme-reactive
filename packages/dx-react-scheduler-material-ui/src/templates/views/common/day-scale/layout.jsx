import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableMUI from '@material-ui/core/Table';
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
      <Row>
        {cellsData[0].map(({
          startDate,
          endDate,
          today,
        }, index) => (
          <Cell
            key={index.toString()}
            startDate={startDate}
            endDate={endDate}
            today={today}
            formatDate={formatDate}
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
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
