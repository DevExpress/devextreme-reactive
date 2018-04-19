import { GroupingPanel as GroupingPanelBase, GroupPanelLayout } from '@devexpress/dx-vue-grid';
import { GroupPanelContainer } from '../templates/group-panel-container';
import { GroupPanelItem } from '../templates/group-panel-item';
import { GroupPanelEmptyMessage } from '../templates/group-panel-empty-message';

const defaultMessages = {
  groupByColumn: 'Drag a column header here to group by that column',
};

export const GroupingPanel = {
  props: {
    messages: {
      type: Object,
    },
  },
  render() {
    const { messages, ...restProps } = this;

    return (
      <GroupingPanelBase
        layoutComponent={GroupPanelLayout}
        containerComponent={GroupPanelContainer}
        itemComponent={GroupPanelItem}
        emptyMessageComponent={GroupPanelEmptyMessage}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  },
};

GroupingPanel.Container = GroupPanelContainer;
GroupingPanel.Item = GroupPanelItem;
GroupingPanel.EmptyMessage = GroupPanelEmptyMessage;
