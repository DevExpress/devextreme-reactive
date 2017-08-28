import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '@devexpress/dx-core';
import { getAction } from '../utils/plugin-helpers';

export const UPDATE_CONNECTION = 'updateConnection';

export class Property extends React.PureComponent {
  componentWillMount() {
    const { pluginHost } = this.context;
    const { name } = this.props;

    let lastComputed;
    let lastPropertyDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Property`]: (original) => {
        const { value, computed } = this.props;
        if (value !== undefined) return value;

        const getPropertyValue = propertyName => ((propertyName === name)
          ? original
          : pluginHost.get(`${propertyName}Property`, this.plugin));

        const currentPropertyDependencies = Object.keys(lastPropertyDependencies)
          .reduce((acc, propertyName) => Object.assign(acc, {
            [propertyName]: getPropertyValue(propertyName),
          }), {});

        if (computed === lastComputed &&
          shallowEqual(lastPropertyDependencies, currentPropertyDependencies)) {
          return lastResult;
        }

        lastComputed = computed;
        lastPropertyDependencies = {};

        const properties = pluginHost.knownKeys('Property')
          .reduce((acc, propertyName) => {
            Object.defineProperty(acc, propertyName, {
              get: () => {
                const result = getPropertyValue(propertyName);
                lastPropertyDependencies[propertyName] = result;
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

        lastResult = computed(properties, actions);
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

Property.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  computed: PropTypes.func,
};

Property.defaultProps = {
  value: undefined,
  computed: null,
  position: null,
};

Property.contextTypes = {
  pluginHost: PropTypes.object.isRequired,
};
