import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, UPDATE_CONNECTION_EVENT, INDEXABLE_COMPONENT } from './constants';

export class Getter extends React.PureComponent {
  componentWillMount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;
    const { name } = this.props;

    let lastComputed;
    let lastTrackedDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => this.props.position(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this.props;
        if (value !== undefined) return value;

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        if (computed === lastComputed &&
          !isTrackedDependenciesChanged(pluginHost, lastTrackedDependencies, getGetterValue)) {
          return lastResult;
        }

        const { getters, trackedDependencies } = getAvailableGetters(pluginHost, getGetterValue);
        const actions = getAvailableActions(pluginHost);

        lastComputed = computed;
        lastTrackedDependencies = trackedDependencies;
        lastResult = computed(getters, actions);
        return lastResult;
      },
    };

    pluginHost.registerPlugin(this.plugin);
  }
  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;

    pluginHost.broadcast(UPDATE_CONNECTION_EVENT);
  }
  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.context;

    pluginHost.unregisterPlugin(this.plugin);
  }
  render() {
    return null;
  }
}

Getter[INDEXABLE_COMPONENT] = true;

Getter.propTypes = {
  position: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  computed: PropTypes.func,
};

Getter.defaultProps = {
  value: undefined,
  computed: null,
  position: null,
};

Getter.contextTypes = {
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
};
