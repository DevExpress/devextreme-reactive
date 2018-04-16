import { PagingPanel as PagingPanelBase } from '@devexpress/dx-vue-grid';
import { Pager } from '../templates/paging-panel/pager';

const defaultMessages = {
  showAll: 'All',
  info: ({ from, to, count }) =>
    `${from}${from < to ? `-${to}` : ''} of ${count}`,
};

export const PagingPanel = {
  name: 'PagingPanel',
  functional: true,
  render(h, context) {
    const { messages } = context.props;
    return (
      <PagingPanelBase
        containerComponent={Pager}
        messages={{ ...defaultMessages, ...messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

PagingPanel.Container = Pager;
