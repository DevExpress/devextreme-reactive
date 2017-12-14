import React from 'react';
import PropTypes from 'prop-types';

import {
  Template,
  PluginContainer,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class HeaderToolbar extends React.PureComponent {
  render() {
    const {
      toolbarComponent: Toolbar,
    } = this.props;

    return (
      <PluginContainer
        pluginName="HeaderToolbar"
      >
        <Template name="header">
          <Toolbar>
            <TemplatePlaceholder name="toolbarContent" />
          </Toolbar>
          <TemplatePlaceholder />
        </Template>
      </PluginContainer>
    );
  }
}

HeaderToolbar.propTypes = {
  toolbarComponent: PropTypes.func.isRequired,
};
