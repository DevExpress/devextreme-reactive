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
  groupedByDate,
  ...restProps
}) => (
  <Table
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    {!groupedByDate && (
      <GroupingPanel />
    )}
    <Row>
      {getDayScaleCells(cellsData, groupedByDate).map(({
        startDate, endDate, today, key,
        endOfGroup, groupingInfo, colSpan,
      }) => (
        <Cell
          key={key}
          startDate={startDate}
          endDate={endDate}
          today={today}
          formatDate={formatDate}
          endOfGroup={endOfGroup}
          groupingInfo={groupingInfo}
          colSpan={colSpan}
        />
      ))}
    </Row>
    {groupedByDate && (
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
  groupedByDate: PropTypes.bool,
};
Layout.defaultProps = {
  groupingPanelComponent: () => null,
  groupedByDate: false,
};
