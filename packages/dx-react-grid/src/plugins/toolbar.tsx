import * as React from 'react';

import {
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { ToolbarProps } from '../types';

class ToolbarBase extends React.PureComponent<ToolbarProps> {
  static components = {
    rootComponent: 'Root',
    flexibleSpaceComponent: 'FlexibleSpace',
  };

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

/** A plugin that renders the Grid toolbar. */
export const Toolbar: React.ComponentType<ToolbarProps> = ToolbarBase;
