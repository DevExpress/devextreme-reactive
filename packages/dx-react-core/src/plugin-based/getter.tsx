import * as React from 'react';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { UPDATE_CONNECTION_EVENT, PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';
import { InnerPlugin } from '@devexpress/dx-core';
import { PluginContextProps } from './plugin-context-prop-types';
import { ComputedFn } from '../types';

export interface GetterProps {
  /** The Getter's name. */
  name: string;
  /** The shared value. */
  value?: any;
  /*** A function that calculates a value depending on the values other Getters expose.
   * The value is computed each time a related Getter's value changes.
   * Applies only if `value` is not defined.
   */
  computed?: ComputedFn;
}

/** @internal */
export class GetterBase extends React.PureComponent<GetterProps & PluginContextProps> {
  plugin: InnerPlugin;
  pluginRegistered: boolean;

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

    this.pluginRegistered = true;
  }

  componentDidMount() {
    if (this.pluginRegistered) {
      return;
    }

    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.registerPlugin(this.plugin);
    this.pluginRegistered = true;
  }

  componentDidUpdate() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.broadcast(UPDATE_CONNECTION_EVENT);
  }

  componentWillUnmount() {
    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.unregisterPlugin(this.plugin);
    this.pluginRegistered = false;
  }

  render() {
    return null;
  }
}

export const Getter: React.ComponentType<GetterProps> = withHostAndPosition(GetterBase);
