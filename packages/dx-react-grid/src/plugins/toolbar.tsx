import * as React from 'react';

import {
  Template,
  Plugin,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { ToolbarProps } from '../types';

export class Toolbar extends React.PureComponent<ToolbarProps> {
  static components: PluginComponents;

  render() {
    const {
      rootComponent: Root,
      flexibleSpaceComponent: FlexibleSpaceComponent,
    } = this.props;
    return (
      <Plugin
        name="Toolbar"
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
      </Plugin>
    );
  }
}

Toolbar.components = {
  rootComponent: 'Root',
  flexibleSpaceComponent: 'FlexibleSpace',
};
