import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';

export const UPDATE_CONNECTION = 'updateConnection';

export const Getter = {
  props: {
    computed: { default: null },
    name: {},
    value: {},
  },
  inject: ['pluginHost'],
  beforeMount() {
    const { pluginHost, name } = this;

    let lastComputed;
    let lastTrackedDependencies = {};
    let lastResult;

    this.plugin = {
      position: () => [0],
      [`${name}Getter`]: (original) => {
        const { value, computed } = this;
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
  },
  beforeDestroy() {
    this.pluginHost.unregisterPlugin(this.plugin);
  },
  render() {
    return null;
  },
};
