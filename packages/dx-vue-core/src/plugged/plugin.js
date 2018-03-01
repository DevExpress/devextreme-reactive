import { PluginIndexer } from './plugin-indexer';

export const Plugin = {
  props: {
    name: {
      default: '',
    },
    dependencies: {
      default() {
        return [];
      },
    },
  },
  inject: {
    pluginHost: {},
    position: {
      from: 'positionContext',
    },
  },
  beforeMount() {
    const {
      pluginHost, position,
      name, dependencies,
    } = this;
    this.plugin = {
      position,
      name,
      dependencies,
      container: true,
    };
    pluginHost.registerPlugin(this.plugin);
  },
  beforeUpdate() {
    this.pluginHost.ensureDependencies();
  },
  beforeDestroy() {
    this.pluginHost.unregisterPlugin(this.plugin);
  },
  render() {
    return (
      <PluginIndexer>
        {this.$slots.default}
      </PluginIndexer>
    );
  },
};
