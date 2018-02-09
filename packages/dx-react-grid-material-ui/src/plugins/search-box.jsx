import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchBox as SearchBoxBase } from '@devexpress/dx-react-grid';
import { SearchBoxInput } from '../templates/search-box-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export const SearchBox = ({ messages, ...restProps }) => (
  <SearchBoxBase
    rootComponent={SearchBoxInput}
    messages={{ ...defaultMessages, ...messages }}
    {...restProps}
  />
);

SearchBox.rootComponent = SearchBoxInput;

SearchBox.propTypes = {
  messages: PropTypes.shape({
    searchPlaceholder: PropTypes.string,
  }),
};

SearchBox.defaultProps = {
  messages: {},
};
