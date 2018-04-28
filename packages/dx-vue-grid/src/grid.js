import { PluginHost } from '@devexpress/dx-vue-core';
import { GridCore } from './plugins/grid-core';

export const DxGrid = {
  name: 'DxGrid',
  functional: true,
  render(h, context) {
    return (
      <PluginHost>
        <GridCore
          {...{ attrs: context.props, on: context.listeners }}
        />
        {context.children}
      </PluginHost>
    );
  },
};
