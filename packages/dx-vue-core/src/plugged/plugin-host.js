import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { PluginIndexer } from './plugin-indexer';
import { TemplatePlaceholder } from './template-placeholder';
import { Template } from './template';

export const PluginHost = {
  beforeCreate() {
    this.pluginHost = new PluginHostCore();
  },
  provide() {
    return {
      pluginHost: this.pluginHost,
    };
  },
  render() {
    return (
      <div>
        <PluginIndexer>
          <Template name="root" />
          {this.$slots.default}
        </PluginIndexer>
        <TemplatePlaceholder name="root" />
      </div>
    );
  },
};
