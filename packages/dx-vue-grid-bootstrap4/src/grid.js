import { Grid as GridBase } from '@devexpress/dx-vue-grid';

import { GridRoot } from './templates/grid-root';

export const Grid = {
  name: 'Grid',
  functional: true,
  render(h, context) {
    return (
      <GridBase
        rootComponent={GridRoot}
        {...{ attrs: context.props, on: context.listeners }}
      >
        {context.children}
      </GridBase>
    );
  },
  Root: GridRoot,
};
