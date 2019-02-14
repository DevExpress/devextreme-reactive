import * as React from 'react';
import { PluginComponents } from '@devexpress/dx-react-core';

/** @internal */
type PatchFn = (props: any) => any;

/** @internal */
export const withPatchedProps = (patch): PatchFn => (Target): React.ComponentType<any> => {
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
