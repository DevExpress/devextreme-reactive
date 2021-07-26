import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  TOP_POSITION,
} from '@devexpress/dx-grid-core';
import { SearchPanelProps } from '../types';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'SearchState' },
];

const defaultMessages = {
  searchPlaceholder: 'Search...',
};

class SearchPanelBase extends React.PureComponent<SearchPanelProps> {
  static defaultProps = {
    messages: {},
  };
  static components = {
    inputComponent: 'Input',
  };
  ref: React.RefObject<HTMLElement> = React.createRef();

  render() {
    const { inputComponent: Input, messages } = this.props;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="SearchPanel"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ searchValue, isDataRemote }, { changeSearchValue, scrollToRow, setSearchPanelRef }) => {
              const onValueChange = (value) => {
                if (isDataRemote) {
                  scrollToRow(TOP_POSITION);
                }
                changeSearchValue(value);
              };
              setSearchPanelRef && setSearchPanelRef(this.ref);

              return <Input
                value={searchValue}
                refObject={this.ref}
                onValueChange={onValueChange}
                getMessage={getMessage}
              />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Search Panel. */
export const SearchPanel: React.ComponentType<SearchPanelProps> = SearchPanelBase;
