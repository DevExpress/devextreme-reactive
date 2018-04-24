import { SearchPanel as SearchPanelBase } from '@devexpress/dx-vue-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export const SearchPanel = {
  name: 'SearchPanel',
  functional: true,
  render(h, context) {
    return (
      <SearchPanelBase
        inputComponent={SearchPanelInput}
        messages={{ ...defaultMessages, ...context.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

SearchPanel.Input = SearchPanelInput;
