import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { totalSummary, groupSummaries } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SummaryState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class IntegratedSummary extends React.PureComponent {
  render() {
    const totalSummaryComputed = ({
      rows,
      totalSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getCollapsedRows,
    }) =>
      totalSummary(
        rows,
        totalSummaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
      );

    const groupSummariesComputed = ({
      rows,
      groupSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
    }) =>
      groupSummaries(
        rows,
        groupSummaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
      );

    return (
      <Plugin
        name="IntegratedSummary"
        dependencies={pluginDependencies}
      >
        <Getter name="totalSummary" computed={totalSummaryComputed} />
        <Getter name="groupSummaries" computed={groupSummariesComputed} />
      </Plugin>
    );
  }
}
