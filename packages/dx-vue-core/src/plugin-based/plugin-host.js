import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { TemplatePlaceholder } from './template-placeholder';
import { PLUGIN_HOST_CONTEXT } from './constants';

export const PluginHost = {
  name: 'PluginHost',
  beforeCreate() {
    this.pluginHost = new PluginHostCore();
  },
  provide() {
    return {
      [PLUGIN_HOST_CONTEXT]: this.pluginHost,
    };
  },
  render() {
    return (
      <div>
        <PluginIndexer>
          {this.$slots.default}
        </PluginIndexer>
        <TemplatePlaceholder name="root" />
      </div>
    );
  },
};
