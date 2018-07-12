import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { totalSummaryValues, groupSummaryValues, treeSummaryValues } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SummaryState' },
];

export class IntegratedSummary extends React.PureComponent {
  render() {
    const { types } = this.props;

    const totalSummaryValuesComputed = ({
      rows,
      totalSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getCollapsedRows,
    }) =>
      totalSummaryValues(
        rows,
        totalSummaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        getCollapsedRows,
        types,
      );

    const groupSummaryValuesComputed = ({
      rows,
      groupSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
    }) =>
      groupSummaryValues(
        rows,
        groupSummaryItems,
        getCellValue,
        getRowLevelKey,
        isGroupRow,
        types,
      );

    const treeSummaryValuesComputed = ({
      rows,
      treeSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getRowId,
    }) =>
      treeSummaryValues(
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
        <Getter name="totalSummaryValues" computed={totalSummaryValuesComputed} />
        <Getter name="groupSummaryValues" computed={groupSummaryValuesComputed} />
        <Getter name="treeSummaryValues" computed={treeSummaryValuesComputed} />
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
