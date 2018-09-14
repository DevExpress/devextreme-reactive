import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'SearchState' },
];

export class SearchPanel extends React.PureComponent {
  render() {
    const { inputComponent: Input, messages } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="SearchPanel"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ searchValue }, { changeSearchValue }) => (
              <Input
                value={searchValue}
                onValueChange={changeSearchValue}
                getMessage={getMessage}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

SearchPanel.propTypes = {
  inputComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

SearchPanel.defaultProps = {
  messages: {},
};
