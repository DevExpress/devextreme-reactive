import * as React from 'react';
import { PluginComponents } from '@devexpress/dx-react-core';

export const withPatchedProps = patch => (Target) => {
  class Component extends React.PureComponent<any> {
    static components: PluginComponents;
    render() {
      const props = patch(this.props);
      return <Target {...props} />;
    }
  }
  Component.components = Target.components;
  return Component;
};
