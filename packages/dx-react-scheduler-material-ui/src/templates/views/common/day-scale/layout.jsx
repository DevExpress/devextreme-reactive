import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table } from '../table';

export const Layout = React.memo(({
  cellComponent: Cell,
  rowComponent: Row,
  groupingPanelComponent: GroupingPanel,
  cellsData,
  formatDate,
  ...restProps
}) => (
  <Table
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    <GroupingPanel />
    <Row>
      {cellsData[0].map(({
        startDate,
        endDate,
        today,
        hasRightBorder,
        groupingInfo,
      }, index) => (
        <Cell
          key={index.toString()}
          startDate={startDate}
          endDate={endDate}
          today={today}
          formatDate={formatDate}
          hasRightBorder={hasRightBorder}
          groupingInfo={groupingInfo}
        />
      ))}
    </Row>
  </Table>
));

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groupingPanelComponent: PropTypes.func,
  formatDate: PropTypes.func.isRequired,
};
Layout.defaultProps = {
  groupingPanelComponent: () => null,
};
