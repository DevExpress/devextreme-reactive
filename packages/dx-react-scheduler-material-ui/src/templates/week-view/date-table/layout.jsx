import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import moment from 'moment';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  timeScale, dayScale,
  dateTableRef,
  classes, className,
  cellComponent: Cell,
  rowComponent: Row,
  addAppointment,
  ...restProps
}) => {
  const doubleClickHandle = (date, time) => {
    const start = moment(date).hours(time.start.getHours()).minutes(time.start.getMinutes());
    const end = moment(date).hours(time.end.getHours()).minutes(time.end.getMinutes());
    addAppointment({ startDate: start.toDate(), endDate: end.toDate(), title: 'No Title' });
  };

  return (
    <RootRef rootRef={dateTableRef}>
      <Table
        className={classNames(classes.table, className)}
        {...restProps}
      >
        <TableBody>
          {timeScale.map((time, index) => (
            <Row key={index.toString()}>
              {dayScale.map(date => <Cell key={date} date={date} time={time} onDoubleClick={() => doubleClickHandle(date, time)} />)}
            </Row>
          ))}
        </TableBody>
      </Table>
    </RootRef>
  );
};

LayoutBase.propTypes = {
  dateTableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  timeScale: PropTypes.array,
  dayScale: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  addAppointment: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  timeScale: [],
  dayScale: [],
  className: undefined,
  cellComponent: () => null,
  rowComponent: () => null,
  addAppointment: () => undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
