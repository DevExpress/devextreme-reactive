import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchPanel as SearchPanelBase } from '@devexpress/dx-react-grid';
import { SearchPanelInput } from '../templates/search-panel-input';

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

export class SearchPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;
    return (
      <SearchPanelBase
        inputComponent={SearchPanelInput}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

SearchPanel.Input = SearchPanelInput;

SearchPanel.propTypes = {
  messages: PropTypes.shape({
    searchPlaceholder: PropTypes.string,
  }),
};

SearchPanel.defaultProps = {
  messages: {},
};
