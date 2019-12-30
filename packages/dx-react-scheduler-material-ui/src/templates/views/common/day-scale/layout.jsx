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
  groupPanelAfterDates,
  ...restProps
}) => (
  <Table
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    {!groupPanelAfterDates && (
      <GroupingPanel />
    )}
    <Row>
      {getDayScaleCells(cellsData, groupPanelAfterDates, Cell, formatDate).map(({
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
          colspan={colSpan}
        />
      ))}
    </Row>
    {groupPanelAfterDates && (
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
  groupPanelAfterDates: PropTypes.bool,
};
Layout.defaultProps = {
  groupingPanelComponent: () => null,
  groupPanelAfterDates: false,
};
