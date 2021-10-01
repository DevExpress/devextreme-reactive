import * as React from 'react';

import {
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { ToolbarProps, TableKeyboardNavigation } from '../types';

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
        {(params: TableKeyboardNavigation.ExtraProps) => (
          <React.Fragment>
            <Root {...params}>
              <TemplatePlaceholder name="toolbarContent" />
            </Root>
            <TemplatePlaceholder />
          </React.Fragment>
        )}
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
