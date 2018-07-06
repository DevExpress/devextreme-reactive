import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { totalSummary, groupSummaries, treeSummaries } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SummaryState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class IntegratedSummary extends React.PureComponent {
  render() {
    const { types } = this.props;

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
        types,
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
        types,
      );

    const treeSummariesComputed = ({
      rows,
      treeSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getRowId,
    }) =>
      treeSummaries(
        rows,
        treeSummaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getRowId,
        types,
      );

    return (
      <Plugin
        name="IntegratedSummary"
        dependencies={pluginDependencies}
      >
        <Getter name="totalSummary" computed={totalSummaryComputed} />
        <Getter name="groupSummaries" computed={groupSummariesComputed} />
        <Getter name="treeSummaries" computed={treeSummariesComputed} />
      </Plugin>
    );
  }
}

IntegratedSummary.propTypes = {
  types: PropTypes.object,
};

IntegratedSummary.defaultProps = {
  types: undefined,
};
