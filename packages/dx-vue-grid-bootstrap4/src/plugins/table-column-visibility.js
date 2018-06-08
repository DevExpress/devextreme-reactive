import { DxTableColumnVisibility as DxTableColumnVisibilityBase } from '@devexpress/dx-vue-grid';
import { EmptyMessage } from '../templates/empty-message';

const defaultMessages = {
  noColumns: 'Nothing to show',
};

export const DxTableColumnVisibility = {
  name: 'DxTableColumnVisibility',
  functional: true,
  render(h, context) {
    return (
      <DxTableColumnVisibilityBase
        emptyMessageComponent={EmptyMessage}
        messages={{ ...defaultMessages, ...context.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxEmptyMessage: EmptyMessage,
  },
};
