import {
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';

export const TemplateConnector = {
  inject: ['pluginHost'],
  render() {
    const getters = getAvailableGetters(this.pluginHost);
    const actions = getAvailableActions(this.pluginHost);
    return this.$scopedSlots.default({ getters, actions });
  },
};
