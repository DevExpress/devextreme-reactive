import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [{ name: 'Toolbar' }];
export const SearchBox = ({ rootComponent: Root, messages }) => {
  const getMessage = getMessagesFormatter(messages);

  return (
    <Plugin
      name="ColumnChooser"
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
    </Plugin>
  );
};

SearchBox.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

SearchBox.defaultProps = {
  messages: {},
};
