import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  monthCells,
  classes,
  dateTableRef,
  className,
  createNewAppointment,
  ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <TableMUI
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {monthCells.map(row => (
          <Row key={row[0].value.toString()}>
            {row.map(date => (
              <Cell
                key={date.value}
                date={date}
                createNewAppointment={createNewAppointment}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </TableMUI>
  </RootRef>
);

LayoutBase.propTypes = {
  monthCells: PropTypes.array.isRequired,
  dateTableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
  createNewAppointment: PropTypes.func,
};
LayoutBase.defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
  className: undefined,
  createNewAppointment: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
