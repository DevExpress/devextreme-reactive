import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { SummaryStateProps } from '../types';

export class SummaryState extends React.PureComponent<SummaryStateProps> {
  render() {
    const { totalItems, groupItems, treeItems } = this.props;

    return (
      <Plugin
        name="SummaryState"
      >
        <Getter name="totalSummaryItems" value={totalItems} />
        <Getter name="groupSummaryItems" value={groupItems} />
        <Getter name="treeSummaryItems" value={treeItems} />
      </Plugin>
    );
  }
}
