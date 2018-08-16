import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import {
  defaultSummaryCalculator,
  totalSummaryValues,
  groupSummaryValues,
  treeSummaryValues,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SummaryState' },
];

export class IntegratedSummary extends React.PureComponent {
  render() {
    const { calculator } = this.props;

    const totalSummaryValuesComputed = ({
      rows,
      totalSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getCollapsedRows,
    }) => totalSummaryValues(
      rows,
      totalSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getCollapsedRows,
      calculator,
    );

    const groupSummaryValuesComputed = ({
      rows,
      groupSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
    }) => groupSummaryValues(
      rows,
      groupSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      calculator,
    );

    const treeSummaryValuesComputed = ({
      rows,
      treeSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getRowId,
    }) => treeSummaryValues(
      rows,
      treeSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getRowId,
      calculator,
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

IntegratedSummary.defaultCalculator = defaultSummaryCalculator;

IntegratedSummary.propTypes = {
  calculator: PropTypes.func,
};

IntegratedSummary.defaultProps = {
  calculator: undefined,
};
