import { DxSearchPanel as DxSearchPanelBase } from '@devexpress/dx-vue-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export const DxSearchPanel = {
  name: 'DxSearchPanel',
  functional: true,
  render(h, context) {
    return (
      <DxSearchPanelBase
        inputComponent={SearchPanelInput}
        messages={{ ...defaultMessages, ...context.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxInput: SearchPanelInput,
  },
};
