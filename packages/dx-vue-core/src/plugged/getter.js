import {
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';

export const Getter = {
  props: {
    computed: { default: null },
    name: {},
    value: {},
  },
  inject: ['pluginHost', 'positionContext'],
  beforeMount() {
    const { pluginHost, name } = this;

    let lastComputed;
    let lastResult;

    this.plugin = {
      position: () => this.positionContext(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this;
        if (value !== undefined) return value;

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        if (computed === lastComputed) {
          return lastResult;
        }

        const getters = getAvailableGetters(pluginHost, getGetterValue);
        const actions = getAvailableActions(pluginHost);

        lastComputed = computed;
        lastResult = computed(getters, actions);
        return lastResult;
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
