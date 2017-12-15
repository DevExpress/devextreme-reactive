import React from 'react';
import PropTypes from 'prop-types';

import {
  Template,
  PluginContainer,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class Toolbar extends React.PureComponent {
  render() {
    const {
      toolbarComponent: ToolbarContent,
    } = this.props;

    return (
      <PluginContainer
        pluginName="Toolbar"
      >
        <Template name="header">
          <ToolbarContent>
            <TemplatePlaceholder name="toolbarContent" />
          </ToolbarContent>
          <TemplatePlaceholder />
        </Template>
      </PluginContainer>
    );
  }
}

Toolbar.propTypes = {
  toolbarComponent: PropTypes.func.isRequired,
};
