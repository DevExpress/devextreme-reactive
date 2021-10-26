import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import classNames from 'clsx';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';

const PREFIX = 'TicksLayout';

export const classes = {
  table: `${PREFIX}-table`,
};

const StyledTable = styled(Table)({
  [`&.${classes.table}`]: {
    tableLayout: 'fixed',
    boxSizing: 'border-box',
  },
});

const TicksLayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  groupOrientation,
  className,
  groupCount,
  includeAllDayCell,
  ...restProps
}) => {
  const groupHeight = cellsData.length / groupCount;
  return (
    <StyledTable {...restProps} className={classNames(classes.table, className)}>
      <TableBody>
        {cellsData.map(([firstDay], index) => (
          <React.Fragment key={index.toString()}>
            {index % groupHeight === 0 && includeAllDayCell && (
              <Row key={(index / groupHeight).toString()}>
                <Cell
                  key={`all-day-tick ${index / groupHeight}`}
                  isAllDay
                  startDate={firstDay.startDate}
                  endDate={firstDay.endDate}
                  endOfGroup={false}
                  groupingInfo={firstDay.groupingInfo}
                />
              </Row>
            )}
            <Row key={(firstDay.startDate + index).toString()}>
              <Cell
                key={index.toString()}
                startDate={firstDay.startDate}
                endDate={firstDay.endDate}
                endOfGroup={firstDay.endOfGroup && groupOrientation === VERTICAL_GROUP_ORIENTATION}
                groupingInfo={firstDay.groupingInfo}
              />
            </Row>
          </React.Fragment>
        ))}
      </TableBody>
    </StyledTable>
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

export const TicksLayout = (TicksLayoutBase);
