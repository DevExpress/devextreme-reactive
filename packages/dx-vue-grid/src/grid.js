import { DxPluginHost } from '@devexpress/dx-vue-core';
import { GridCore } from './plugins/grid-core';

export const DxGrid = {
  name: 'DxGrid',
  functional: true,
  render(h, context) {
    return (
      <DxPluginHost>
        <GridCore
          {...context.data}
        />
        {context.children}
      </DxPluginHost>
    );
  },
};
