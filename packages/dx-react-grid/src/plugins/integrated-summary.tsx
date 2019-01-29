import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import {
  defaultSummaryCalculator,
  totalSummaryValues,
  groupSummaryValues,
  treeSummaryValues,
  SummaryCalculator,
} from '@devexpress/dx-grid-core';
import { IntegratedSummaryProps } from '../types';

const pluginDependencies = [
  { name: 'SummaryState' },
];

export class IntegratedSummary extends React.PureComponent<IntegratedSummaryProps> {
  static defaultCalculator: SummaryCalculator = defaultSummaryCalculator;

  render() {
    const { calculator } = this.props;

    const totalSummaryValuesComputed = ({
      rows,
      totalSummaryItems,
      getCellValue,
      getRowLevelKey,
      isGroupRow,
      getCollapsedRows,
    }: Getters) => totalSummaryValues(
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
    }: Getters) => groupSummaryValues(
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
    }: Getters) => treeSummaryValues(
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
