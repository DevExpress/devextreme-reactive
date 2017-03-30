import React from 'react';
import { argumentsShallowEqual } from '../utils/shallowEqual';

function getterMemoize(func, onChange) {
  let lastArg = null;
  let lastResult = null;
  return (...args) => {
    if (
      lastArg === null ||
      !argumentsShallowEqual(lastArg, args)
    ) {
      lastResult = func(...args);
      onChange(lastResult);
    }
    lastArg = args;
    return lastResult;
  };
}

export const UPDATE_CONNECTION = 'updateConnection';

const noop = () => {};

export class Getter extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name, pureComputed, onChange } = this.props;
    const pureComputedMemoized = getterMemoize(pureComputed, result => onChange(result));

    this.plugin = {
      [`${name}Getter`]: original => () => {
        const { value, connectArgs } = this.props;
        if (value !== null) return value;

        let args = [];
        if (connectArgs) {
          const getter = (getterName) => {
            if (getterName === name) return original;

            return pluginHost.get(`${getterName}Getter`, this.plugin);
          };
          args = connectArgs(getter);
        }
        return pureComputedMemoized(...args);
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }
  componentDidUpdate() {
    const { pluginHost } = this.context;

    pluginHost.broadcast(UPDATE_CONNECTION);
  }
  componentWillUnmount() {
    const { pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}
Getter.defaultProps = {
  onChange: noop,
  value: null,
  pureComputed: null,
  connectArgs: null,
};
Getter.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  pureComputed: React.PropTypes.func,
  connectArgs: React.PropTypes.func,
};
Getter.contextTypes = {
  pluginHost: React.PropTypes.object.isRequired,
};
