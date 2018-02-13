import * as React from 'react';
import { SearchPanel as SearchPanelBase } from '@devexpress/dx-react-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

export const SearchPanel = props => (
  <SearchPanelBase
    rootComponent={SearchPanelInput}
    {...props}
  />
);

SearchPanel.rootComponent = SearchPanelInput;

