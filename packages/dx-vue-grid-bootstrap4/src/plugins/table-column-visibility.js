import { DxTableColumnVisibility as DxTableColumnVisibilityBase } from '@devexpress/dx-vue-grid';
import { EmptyMessage } from '../templates/empty-message';

const defaultMessages = {
  noColumns: 'Nothing to show',
};

export const DxTableColumnVisibility = {
  name: 'DxTableColumnVisibility',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxTableColumnVisibilityBase
        emptyMessageComponent={EmptyMessage}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...{ attrs: context.data.attrs, on: context.listeners }}
      />
    );
  },
  components: {
    DxEmptyMessage: EmptyMessage,
  },
};
