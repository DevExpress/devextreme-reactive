import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getDayScaleCells } from '@devexpress/dx-scheduler-core';
import { Table } from '../table';

export const Layout = React.memo(({
  cellComponent: Cell,
  rowComponent: Row,
  groupingPanelComponent: GroupingPanel,
  cellsData,
  formatDate,
  isGroupingPanelAfterDates,
  ...restProps
}) => (
  <Table
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    {!isGroupingPanelAfterDates && (
      <GroupingPanel />
    )}
    <Row>
      {getDayScaleCells(cellsData, isGroupingPanelAfterDates).map(({
        startDate, endDate, today, key,
        hasRightBorder, groupingInfo, colSpan,
      }) => (
        <Cell
          key={key}
          startDate={startDate}
          endDate={endDate}
          today={today}
          formatDate={formatDate}
          hasRightBorder={hasRightBorder}
          groupingInfo={groupingInfo}
          colSpan={colSpan}
        />
      ))}
    </Row>
    {isGroupingPanelAfterDates && (
      <GroupingPanel />
    )}
  </Table>
));

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
  isGroupingPanelAfterDates: PropTypes.bool,
};
Layout.defaultProps = {
  groupingPanelComponent: () => null,
  isGroupingPanelAfterDates: false,
};
