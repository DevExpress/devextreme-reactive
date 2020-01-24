import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';

const styles = {
  table: {
    tableLayout: 'fixed',
    boxSizing: 'border-box',
    borderCollapse: 'separate',
  },
};

const TicksLayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  classes,
  groups,
  groupOrientation,
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
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  groupOrientation: PropTypes.anyOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TicksLayoutBase.defaultProps = {
  groups: [[{}]],
  className: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
};

export const TicksLayout = withStyles(styles, { name: 'TicksLayout' })(TicksLayoutBase);
