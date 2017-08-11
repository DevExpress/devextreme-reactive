import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import { getAction } from '../utils/plugin-helpers';

export const UPDATE_CONNECTION = 'updateConnection';

export class Getter extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    let lastComputed;
    let lastGetterDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this.props;
        if (value !== undefined) return value;

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        const currentGetterDependencies = Object.keys(lastGetterDependencies)
          .reduce((acc, getterName) => Object.assign(acc, {
            [getterName]: getGetterValue(getterName),
          }), {});

        if (computed === lastComputed &&
          shallowEqual(lastGetterDependencies, currentGetterDependencies)) {
          return lastResult;
        }

        lastComputed = computed;
        lastGetterDependencies = {};

        const getters = pluginHost.knownKeys('Getter')
          .reduce((acc, getterName) => {
            Object.defineProperty(acc, getterName, {
              get: () => {
                const result = getGetterValue(getterName);
                lastGetterDependencies[getterName] = result;
                return result;
              },
            });
            return acc;
          }, {});
        const actions = pluginHost.knownKeys('Action')
          .reduce((acc, actionName) => {
            Object.defineProperty(acc, actionName, {
              get: () => getAction(pluginHost, actionName),
            });
            return acc;
          }, {});

        lastResult = computed(getters, actions);
        return lastResult;
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

Getter.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  computed: PropTypes.func,
};

Getter.defaultProps = {
  value: undefined,
  computed: null,
  position: null,
};

Getter.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
