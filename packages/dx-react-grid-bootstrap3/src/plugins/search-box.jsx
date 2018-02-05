import React from 'react';
import { SearchBox as SearchBoxBase } from '@devexpress/dx-react-grid';
import { SearchBoxInput } from '../templates/search-box-input';

export const SearchBox = props => (
  <SearchBoxBase
    rootComponent={SearchBoxInput}
    {...props}
  />
);

SearchBox.rootComponent = SearchBoxInput;

