import { DxPagingPanel as DxPagingPanelBase } from '@devexpress/dx-vue-grid';
import { Pager } from '../templates/paging-panel/pager';

const defaultMessages = {
  showAll: 'All',
  info: ({ from, to, count }) => `${from}${from < to ? `-${to}` : ''} of ${count}`,
};

export const DxPagingPanel = {
  name: 'DxPagingPanel',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxPagingPanelBase
        containerComponent={Pager}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...context.data}
      />
    );
  },
  components: {
    DxContainer: Pager,
  },
};
