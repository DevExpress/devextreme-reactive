import { PluginHost } from '@devexpress/dx-vue-core';
import { GridCore } from './plugins/grid-core';

export const Grid = {
  name: 'Grid',
  render() {
    return (
      <PluginHost>
        <GridCore
          {...{ attrs: this.$attrs, listeners: this.$listeners }}
        />
        {this.$slots.default}
      </PluginHost>
    );
  },
};
