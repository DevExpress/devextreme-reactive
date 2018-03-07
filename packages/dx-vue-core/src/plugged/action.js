import {
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

export const Action = {
  props: {
    name: {},
    action: {},
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    position: { from: POSITION_CONTEXT },
  },
  beforeMount() {
    const { pluginHost, name } = this;

    this.plugin = {
      position: () => this.position(),
      [`${name}Action`]: (params) => {
        const { action } = this;
        const getters = getAvailableGetters(
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
  },
  beforeDestroy() {
    this.pluginHost.unregisterPlugin(this.plugin);
  },
  render() {
    return null;
  },
};
