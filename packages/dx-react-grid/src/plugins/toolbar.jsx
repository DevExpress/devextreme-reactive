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
      rootComponent: ToolbarComponent,
      flexibleSpaceComponent: FlexibleSpaceComponent,
    } = this.props;
    return (
      <PluginContainer
        pluginName="Toolbar"
      >
        <Template name="header">
          <ToolbarComponent>
            <TemplatePlaceholder name="toolbarContent" />
          </ToolbarComponent>
          <TemplatePlaceholder />
        </Template>
        <Template name="toolbarContent">
          <FlexibleSpaceComponent />
        </Template>
      </PluginContainer>
    );
  }
}

Toolbar.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  flexibleSpaceComponent: PropTypes.func.isRequired,
};
