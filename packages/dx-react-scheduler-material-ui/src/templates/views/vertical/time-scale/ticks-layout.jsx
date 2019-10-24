import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const TicksLayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  classes,
  className,
  ...restProps
}) => (
  <Table {...restProps} className={classNames(classes.table, className)}>
    <TableBody>
      {cellsData.map(days => (
        <Row key={days[0].startDate}>
          <Cell key={days[0].endDate} />
        </Row>
      ))}
    </TableBody>
  </Table>
);

TicksLayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TicksLayoutBase.defaultProps = {
  className: undefined,
};

export const TicksLayout = withStyles(styles, { name: 'TicksLayout' })(TicksLayoutBase);
