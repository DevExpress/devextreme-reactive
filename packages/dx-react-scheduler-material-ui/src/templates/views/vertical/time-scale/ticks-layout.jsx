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
  },
};

const TicksLayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  classes,
  groupOrientation,
  className,
  groupCount,
  includeAllDayCell,
  ...restProps
}) => {
  const groupHeight = cellsData.length / groupCount;
  return (
    <Table {...restProps} className={classNames(classes.table, className)}>
      <TableBody>
        {cellsData.map((days, index) => (
          <>
            {index % groupHeight === 0 && includeAllDayCell && (
              <Row key={index.toString()}>
                <Cell
                  // key={index.toString()}
                  isAllDay
                  startDate={days[0].startDate}
                  endDate={days[0].endDate}
                  endOfGroup={false}
                  groupingInfo={days[0].groupingInfo}
                />
              </Row>
            )}
            <Row key={(days[0].startDate + index).toString()}>
              <Cell
                key={index.toString()}
                startDate={days[0].startDate}
                endDate={days[0].endDate}
                endOfGroup={days[0].endOfGroup && groupOrientation === VERTICAL_GROUP_ORIENTATION}
                groupingInfo={days[0].groupingInfo}
              />
            </Row>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

TicksLayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupOrientation: PropTypes.oneOf([HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION]),
  groupCount: PropTypes.number,
  includeAllDayCell: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TicksLayoutBase.defaultProps = {
  className: undefined,
  groupOrientation: HORIZONTAL_GROUP_ORIENTATION,
  groupCount: 1,
  includeAllDayCell: false,
};

export const TicksLayout = withStyles(styles, { name: 'TicksLayout' })(TicksLayoutBase);
