import * as React from 'react';
import { InnerPlugin } from '@devexpress/dx-core';
import {
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';
import { withHostAndPosition } from '../utils/with-props-from-context';
import { PluginContextProps } from './plugin-context-prop-types';
import { Getters, Actions } from '../types';

export interface ActionProps {
  /** The action name. */
  name: string;
  /** A function that is called when the action is executed. */
  action: (payload: any, getters: Getters, actions: Actions) => void;
}

class ActionBase extends React.PureComponent<ActionProps & PluginContextProps> {
  plugin: InnerPlugin;
  pluginRegistered: boolean;

  constructor(props) {
    super(props);

    const { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: positionContext } = props;
    const { name } = props;

    this.plugin = {
      position: () => positionContext(),
      [`${name}Action`]: (params) => {
        const { action } = this.props;
        const { getters } = getAvailableGetters(
          pluginHost,
          getterName => pluginHost.get(`${getterName}Getter`, this.plugin),
        );
        let nextParams = params;
        const actions = getAvailableActions(
          pluginHost,
          actionName => (actionName === name
            ? (newParams) => { nextParams = newParams; }
            : pluginHost.collect(`${actionName}Action`, this.plugin).slice().reverse()[0]),
        );
        action(params, getters, actions);
        const nextAction = pluginHost.collect(`${name}Action`, this.plugin).slice().reverse()[0];
        if (nextAction) {
          nextAction(nextParams);
        }
      },
    };

    pluginHost.registerPlugin(this.plugin);

    this.pluginRegistered = true;
  }

  componentDidMount() {
    if (this.pluginRegistered)
      return;

    const { [PLUGIN_HOST_CONTEXT]: pluginHost } = this.props;

    pluginHost.registerPlugin(this.plugin);
    this.pluginRegistered = true;
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

export const Action: React.ComponentType<ActionProps> = withHostAndPosition(ActionBase);
