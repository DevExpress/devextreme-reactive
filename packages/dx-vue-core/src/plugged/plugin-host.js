import { PluginHost as PluginHostCore } from '@devexpress/dx-core';
import { TemplatePlaceholder } from './template-placeholder';

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
        {this.$slots.default}
        <TemplatePlaceholder name="root" />
      </div>
    );
  },
};
