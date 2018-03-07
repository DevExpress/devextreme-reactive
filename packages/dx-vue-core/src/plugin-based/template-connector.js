import {
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT } from './constants';

export const TemplateConnector = {
  name: 'TemplateConnector',
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
  },
  render() {
    const getters = getAvailableGetters(this.pluginHost);
    const actions = getAvailableActions(this.pluginHost);
    return this.$scopedSlots.default({ getters, actions });
  },
};
