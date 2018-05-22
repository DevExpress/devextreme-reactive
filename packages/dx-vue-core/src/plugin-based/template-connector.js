import {
  getAvailableGetters,
  getAvailableActions,
  isTrackedDependenciesChanged,
} from './helpers';
import { PLUGIN_HOST_CONTEXT, UPDATE_CONNECTION_EVENT } from './constants';

export const DxTemplateConnector = {
  name: 'DxTemplateConnector',
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
  },
  beforeMount() {
    this.trackedDependencies = {};
    this.subscription = {
      [UPDATE_CONNECTION_EVENT]: () => this.updateConnection(),
    };
    this.pluginHost.registerSubscription(this.subscription);
  },
  beforeDestroy() {
    this.pluginHost.unregisterSubscription(this.subscription);
  },
  methods: {
    updateConnection() {
      if (isTrackedDependenciesChanged(this.pluginHost, this.trackedDependencies)) {
        this.$forceUpdate();
      }
    },
  },
  render() {
    const { getters, trackedDependencies } = getAvailableGetters(this.pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(this.pluginHost);

    return this.$scopedSlots.default({ getters, actions });
  },
};
