import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { CustomSummaryProps } from '../types/summary/custom-summary.types';

const pluginDependencies = [
  { name: 'SummaryState' },
];

class CustomSummaryBase extends React.PureComponent<CustomSummaryProps> {
  render() {
    const { totalValues, groupValues, treeValues } = this.props;

    return (
      <Plugin
        name="CustomSummary"
        dependencies={pluginDependencies}
      >
        <Getter name="totalSummaryValues" value={totalValues} />
        <Getter name="groupSummaryValues" value={groupValues} />
        <Getter name="treeSummaryValues" value={treeValues} />
      </Plugin>
    );
  }
}

/** A plugin that allows you to calculate a custom summary. */
export const CustomSummary: React.ComponentType<CustomSummaryProps> = CustomSummaryBase;
