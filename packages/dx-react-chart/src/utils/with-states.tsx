import * as React from 'react';

export const withStates = (
  states: { readonly [key: string]: (props: any) => any; },
) => <K extends any>(Component: React.ComponentType<K>): React.ComponentType<K> => {
  class ComponentWithStates extends React.PureComponent<K> {
    render() {
      const { state, ...restProps } = this.props;
      const stateFunc = state && states[state];
      const result = stateFunc ? stateFunc(restProps) : restProps;
      return React.isValidElement(result) ? result : <Component {...result} />;
    }
  }
  return ComponentWithStates;
};
