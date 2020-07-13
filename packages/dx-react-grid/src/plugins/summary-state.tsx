import * as React from 'react';
import { Getter, Plugin, Getters } from '@devexpress/dx-react-core';
import { prepareGroupSummaryItems } from '@devexpress/dx-grid-core';
import { SummaryStateProps } from '../types';

const groupSummaryItemsComputed = (
  { groupSummaryItems }: Getters,
) => prepareGroupSummaryItems(groupSummaryItems);

class SummaryStateBase extends React.PureComponent<SummaryStateProps> {
  static defaultProps = {
    totalItems: [],
    groupItems: [],
    treeItems: [],
  };

  render() {
    const { totalItems, groupItems, treeItems } = this.props;

    return (
      <Plugin
        name="SummaryState"
      >
        <Getter name="totalSummaryItems" value={totalItems} />
        <Getter name="groupSummaryItems" value={groupItems} />
        <Getter name="groupSummaryItems" computed={groupSummaryItemsComputed} />
        <Getter name="treeSummaryItems" value={treeItems} />
      </Plugin>
    );
  }
}

/** A plugin that provides items for total, group, and tree summaries. */
export const SummaryState: React.ComponentType<SummaryStateProps> = SummaryStateBase;
