import { DxSearchPanel as DxSearchPanelBase } from '@devexpress/dx-vue-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export const DxSearchPanel = {
  name: 'DxSearchPanel',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxSearchPanelBase
        inputComponent={SearchPanelInput}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...context.data}
      />
    );
  },
  components: {
    DxInput: SearchPanelInput,
  },
};
