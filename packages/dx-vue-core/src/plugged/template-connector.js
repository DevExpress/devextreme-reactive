import { UPDATE_CONNECTION } from './getter';
import {
  isTrackedDependenciesChanged,
  getAvailableGetters,
  getAvailableActions,
} from '../utils/plugin-helpers';

export const TemplateConnector = {
  inject: ['pluginHost'],
  created() {
    this.trackedDependencies = {};
    this.subscription = {
      [UPDATE_CONNECTION]: () => {
        if (isTrackedDependenciesChanged(this.pluginHost, this.trackedDependencies)) {
          this.$forceUpdate();
        }
      },
    };
  },
  beforeMount() {
    this.pluginHost.registerSubscription(this.subscription);
  },
  beforeDestroy() {
    this.pluginHost.unregisterSubscription(this.subscription);
  },
  render() {
    const { getters, trackedDependencies } = getAvailableGetters(this.pluginHost);
    this.trackedDependencies = trackedDependencies;
    const actions = getAvailableActions(this.pluginHost);
    return this.$scopedSlots.default({ getters, actions });
  },
};
