import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

export const LayoutBase = ({
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  className,
  dayScale,
  classes,
  ...restProps
}) => (
  <TableMUI
    className={classNames(classes.table, className)}
    {...restProps}
  >
    <TableBody>
      <Row>
        {dayScale.map(date => (
          <Cell
            key={date}
            date={date}
          />
        ))}
      </Row>
    </TableBody>
  </TableMUI>
);

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  dayScale: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
  className: undefined,
  dayScale: [],
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
