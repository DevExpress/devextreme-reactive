import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
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
  timeScale,
  classes,
  className,
  ...restProps
}) => (
  <Table {...restProps} className={classNames(classes.table, className)}>
    <TableBody>
      {timeScale.map((time, index) => {
        const hour = moment(time.end).hour();
        const minute = moment(time.end).minute();
        return (
          <Row key={time.start}>
            {index % 2
              ? null
              : (
                <Cell
                  rowSpan="2"
                  time={moment().hour(hour).minute(minute).toDate()}
                />
              )}
          </Row>
        );
      })}
    </TableBody>
  </Table>
);

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  timeScale: PropTypes.array,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
  className: undefined,
  timeScale: [],
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
