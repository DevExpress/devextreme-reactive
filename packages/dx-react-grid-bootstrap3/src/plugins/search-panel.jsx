import * as React from 'react';
import { SearchPanel as SearchPanelBase } from '@devexpress/dx-react-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

export const SearchPanel = props => (
  <SearchPanelBase
    inputComponent={SearchPanelInput}
    {...props}
  />
);

SearchPanel.inputComponent = SearchPanelInput;

