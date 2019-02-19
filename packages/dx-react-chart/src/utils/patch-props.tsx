import * as React from 'react';
import { ITargetComponent } from '@devexpress/dx-react-core';

/** @internal */
export const withPatchedProps = (
  patch: <T extends any>(props: T) => T,
) => <K extends object>(Target: React.ComponentType<K>): React.ComponentType<K> => {
  class Component extends React.PureComponent<K> {
    static components = (Target as any as ITargetComponent).components;

    render() {
      const props = patch(this.props);
      return <Target {...props} />;
    }
  }
  return Component;
};
