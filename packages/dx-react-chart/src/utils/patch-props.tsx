import * as React from 'react';
import { ITargetComponent } from '@devexpress/dx-react-core';
import { CommonComponentProps } from '@devexpress/dx-chart-core';
import { RawAxisProps, ScaleProps } from '../types';

/** @internal */
export const withPatchedProps = (
  patch: <T extends CommonComponentProps | RawAxisProps | ScaleProps>(props: T) => T,
) => <K extends CommonComponentProps | RawAxisProps | ScaleProps>(
  Target: React.ComponentType<K>,
): React.ComponentType<K> => {
  class Component extends React.PureComponent<K> {
    static components = (Target as any as ITargetComponent).components;

    render() {
      const props = patch(this.props as K);
      return <Target {...props} />;
    }
  }
  return Component;
};
