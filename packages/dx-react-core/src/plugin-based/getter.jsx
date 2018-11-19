import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { UPDATE_CONNECTION_EVENT, PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';

class GetterBase extends React.PureComponent {
  constructor(props) {
    super(props);

    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: positionContext } = props;
    const { name } = props;

    let lastComputed;
    let lastTrackedDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => positionContext(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this.props;
        if (computed === undefined) return value;

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        if (computed === lastComputed
          && !isTrackedDependenciesChanged(pluginHost, lastTrackedDependencies, getGetterValue)) {
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
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.broadcast(UPDATE_CONNECTION_EVENT);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.unregisterPlugin(this.plugin);
  }

  render() {
    return null;
  }
}

GetterBase.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  computed: PropTypes.func,
  [PLUGIN_HOST_CONTEXT]: PropTypes.object.isRequired,
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
};

GetterBase.defaultProps = {
  value: undefined,
  computed: undefined,
};

export const Getter = withHostAndPosition(GetterBase);
