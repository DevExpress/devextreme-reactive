import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { DxTemplatePlaceholder } from './template-placeholder';
import { PLUGIN_HOST_CONTEXT } from './constants';

export const DxPluginHost = {
  name: 'DxPluginHost',
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
        <DxTemplatePlaceholder name="root" />
      </div>
    );
  },
};
