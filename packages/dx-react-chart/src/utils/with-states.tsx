import * as React from 'react';

type ComponentWithStatesProps = {
  state?: string,
};
type TargetComponent = React.ComponentType<any>;

export const withStates = (states): any => (Component): TargetComponent => {
  class ComponentWithStates extends React.PureComponent<ComponentWithStatesProps & any> {
    render() {
      const { state, ...restProps } = this.props;
      const stateFunc = state && states[state];
      const result = stateFunc ? stateFunc(restProps) : restProps;
      return React.isValidElement(result) ? result : <Component {...result} />;
    }
  }
  return ComponentWithStates;
};
