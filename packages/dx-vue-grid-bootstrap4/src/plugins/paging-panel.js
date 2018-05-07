import { DxPagingPanel as DxPagingPanelBase } from '@devexpress/dx-vue-grid';
import { Pager } from '../templates/paging-panel/pager';

const defaultMessages = {
  showAll: 'All',
  info: ({ from, to, count }) =>
    `${from}${from < to ? `-${to}` : ''} of ${count}`,
};

export const DxPagingPanel = {
  name: 'DxPagingPanel',
  functional: true,
  render(h, context) {
    const { messages } = context.props;
    return (
      <DxPagingPanelBase
        containerComponent={Pager}
        messages={{ ...defaultMessages, ...messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxContainer: Pager,
  },
};
