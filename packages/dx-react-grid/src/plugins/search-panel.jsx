import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'SearchingState' },
];

export const SearchPanel = ({ inputComponent: Input, messages }) => {
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
              searchValue={searchValue}
              changeSearchValue={changeSearchValue}
              getMessage={getMessage}
            />
            )}
        </TemplateConnector>
      </Template>
    </Plugin>
  );
};

SearchPanel.propTypes = {
  inputComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

SearchPanel.defaultProps = {
  messages: {},
};
