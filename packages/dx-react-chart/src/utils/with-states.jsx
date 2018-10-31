import * as React from 'react';
import * as PropTypes from 'prop-types';

const defaultStateFunc = props => props;

export const withStates = states => (Component) => {
  class ComponentWithStates extends React.PureComponent {
    render() {
      const { state, ...restProps } = this.props;
      const stateFunc = states[state] || defaultStateFunc;
      const result = stateFunc(restProps);
      return React.isValidElement(result) ? result : <Component {...result} />;
    }
  }
  ComponentWithStates.propTypes = {
    state: PropTypes.string,
  };
  ComponentWithStates.defaultProps = {
    state: undefined,
  };
  return ComponentWithStates;
};
