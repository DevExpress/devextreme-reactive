import { DxGroupingPanel as DxGroupingPanelBase, GroupPanelLayout } from '@devexpress/dx-vue-grid';
import { GroupPanelContainer } from '../templates/group-panel-container';
import { GroupPanelItem } from '../templates/group-panel-item';
import { GroupPanelEmptyMessage } from '../templates/group-panel-empty-message';

const defaultMessages = {
  groupByColumn: '',
};

export const DxGroupingPanel = {
  name: 'DxGroupingPanel',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxGroupingPanelBase
        layoutComponent={GroupPanelLayout}
        containerComponent={GroupPanelContainer}
        itemComponent={GroupPanelItem}
        emptyMessageComponent={GroupPanelEmptyMessage}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...{ attrs: context.data.attrs, on: context.listeners }}
      />
    );
  },
  components: {
    DxContainer: GroupPanelContainer,
    DxItem: GroupPanelItem,
    DxEmptyMessage: GroupPanelEmptyMessage,
  },
};

