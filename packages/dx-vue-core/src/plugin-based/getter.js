import {
  getAvailableGetters,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

export const Getter = {
  name: 'Getter',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {},
    computed: {
      type: Function,
      default: null,
    },
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    position: { from: POSITION_CONTEXT },
  },
  beforeMount() {
    const { pluginHost, name } = this;

    this.plugin = {
      position: () => this.position(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this;
        if (value !== undefined) return value;
        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        const getters = getAvailableGetters(pluginHost, getGetterValue);
        const actions = getAvailableActions(pluginHost);
        return computed(getters, actions);
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
