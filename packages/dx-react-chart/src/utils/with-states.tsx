import * as React from 'react';
import { CommonComponentProps } from '@devexpress/dx-chart-core';

export const withStates = (
  states: { readonly [key: string]: (props: any) => any; },
) => <K extends CommonComponentProps>(
  Component: React.ComponentType<K>,
): React.ComponentType<K> => {
  class ComponentWithStates extends React.PureComponent<K> {
    render() {
      const { state, ...restProps } = this.props;
      const stateFunc = state && states[state!];
      const result = stateFunc ? stateFunc(restProps) : restProps;
      return React.isValidElement(result) ? result : <Component {...result} />;
    }
  }
  return ComponentWithStates;
};
