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
      rootComponent: Root,
      flexibleSpaceComponent: FlexibleSpaceComponent,
    } = this.props;
    return (
      <PluginContainer
        pluginName="Toolbar"
      >
        <Template name="header">
          <Root>
            <TemplatePlaceholder name="toolbarContent" />
          </Root>
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
