import { DxGroupingPanel as DxGroupingPanelBase, GroupPanelLayout } from '@devexpress/dx-vue-grid';
import { GroupPanelContainer } from '../templates/group-panel-container';
import { GroupPanelItem } from '../templates/group-panel-item';
import { GroupPanelEmptyMessage } from '../templates/group-panel-empty-message';

const defaultMessages = {
  groupByColumn: 'Drag a column header here to group by that column',
};

export const DxGroupingPanel = {
  name: 'DxGroupingPanel',
  functional: true,
  render(h, context) {
    const { messages } = context.props;

    return (
      <DxGroupingPanelBase
        layoutComponent={GroupPanelLayout}
        containerComponent={GroupPanelContainer}
        itemComponent={GroupPanelItem}
        emptyMessageComponent={GroupPanelEmptyMessage}
        messages={{ ...defaultMessages, ...messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxContainer: GroupPanelContainer,
    DxItem: GroupPanelItem,
    DxEmptyMessage: GroupPanelEmptyMessage,
  },
};

