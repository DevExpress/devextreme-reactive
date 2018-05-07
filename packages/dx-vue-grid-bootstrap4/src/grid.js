import { DxGrid as DxGridBase } from '@devexpress/dx-vue-grid';

import { GridRoot } from './templates/grid-root';

export const DxGrid = {
  name: 'Grid',
  functional: true,
  render(h, context) {
    return (
      <DxGridBase
        rootComponent={GridRoot}
        {...{ attrs: context.props, on: context.listeners }}
      >
        {context.children}
      </DxGridBase>
    );
  },
  Root: GridRoot,
};
