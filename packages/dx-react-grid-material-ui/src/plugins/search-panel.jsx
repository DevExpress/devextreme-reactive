import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchPanel as SearchPanelBase } from '@devexpress/dx-react-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export const SearchPanel = ({ messages, ...restProps }) => (
  <SearchPanelBase
    rootComponent={SearchPanelInput}
    messages={{ ...defaultMessages, ...messages }}
    {...restProps}
  />
);

SearchPanel.rootComponent = SearchPanelInput;

SearchPanel.propTypes = {
  messages: PropTypes.shape({
    searchPlaceholder: PropTypes.string,
  }),
};

SearchPanel.defaultProps = {
  messages: {},
};
