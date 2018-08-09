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

const LayoutBase = ({
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
        {dayScale.map((date, index) => (
          <Cell
            key={index.toString()}
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
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
  className: undefined,
  dayScale: [],
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
