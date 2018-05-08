import { PluginIndexer } from './plugin-indexer';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

export const DxPlugin = {
  name: 'DxPlugin',
  props: {
    name: {
      type: String,
      default: '',
    },
    dependencies: {
      type: Array,
      default: () => [],
    },
  },
  inject: {
    pluginHost: { from: PLUGIN_HOST_CONTEXT },
    position: { from: POSITION_CONTEXT },
  },
  beforeMount() {
    const {
      pluginHost, position, name, dependencies,
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
