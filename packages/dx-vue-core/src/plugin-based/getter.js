import {
  getAvailableGetters,
  isTrackedDependenciesChanged,
  getAvailableActions,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT, UPDATE_CONNECTION_EVENT } from './constants';

const GLOBAL_SHIFT = 0xffff;

let globalGetterId = 0;
export const DxGetter = {
  name: 'DxGetter',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: null,
    computed: {
      type: Function,
      default: undefined,
    },
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    position: { from: POSITION_CONTEXT },
  },
  created() {
    this.globalId = globalGetterId;
    globalGetterId += 1;
    this.internalId = 0;
    this.generateId();
  },
  beforeMount() {
    const { pluginHost, name } = this;

    let lastComputed;
    let lastTrackedDependencies = {};
    let lastResult;
    let unwatch;

    this.plugin = {
      position: () => this.position(),
      [`${name}Getter`]: (original) => {
        const { value, computed } = this;
        if (computed === undefined) return { id: this.id, value };

        const getGetterValue = getterName => ((getterName === name)
          ? original
          : pluginHost.get(`${getterName}Getter`, this.plugin));

        if (computed === lastComputed
          && !isTrackedDependenciesChanged(pluginHost, lastTrackedDependencies, getGetterValue)) {
          return { id: this.id, value: lastResult };
        }

        const { getters, trackedDependencies } = getAvailableGetters(pluginHost, getGetterValue);
        const actions = getAvailableActions(pluginHost);

        lastComputed = computed;
        lastTrackedDependencies = trackedDependencies;
        if (unwatch) unwatch();
        unwatch = this.$watch(
          () => computed(getters, actions),
          (newValue) => {
            this.generateId();
            lastResult = newValue;
          },
          { immediate: true },
        );
        return { id: this.id, value: lastResult };
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
  methods: {
    generateId() {
      this.internalId = this.internalId + 1 < GLOBAL_SHIFT ? this.internalId + 1 : 0;
      // eslint-disable-next-line no-bitwise
      this.id = (this.globalId << GLOBAL_SHIFT) + this.internalId;
    },
  },
  watch: {
    value() {
      this.generateId();
      this.pluginHost.broadcast(UPDATE_CONNECTION_EVENT);
    },
  },
};
