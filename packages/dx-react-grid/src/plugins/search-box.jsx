import React from 'react';
import PropTypes from 'prop-types';
import {
  Template,
  TemplatePlaceholder,
  PluginContainer,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [{ pluginName: 'Toolbar' }];
export const SearchBox = ({ rootComponent: Root, messages }) => {
  const getMessage = getMessagesFormatter(messages);

  return (
    <PluginContainer
      pluginName="ColumnChooser"
      dependencies={pluginDependencies}
    >
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        <TemplateConnector>
          {({ searchValue }, { changeSearchValue }) => (
            <Root
              searchValue={searchValue}
              changeSearchValue={changeSearchValue}
              getMessage={getMessage}
            />
            )}
        </TemplateConnector>
      </Template>
    </PluginContainer>
  );
};

SearchBox.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

SearchBox.defaultProps = {
  messages: {},
};
