import { Grid as GridBase } from '@devexpress/dx-vue-grid';

import { GridRoot } from './templates/grid-root';

export const Grid = {
  name: 'Grid',
  render() {
    return (
      <GridBase
        rootComponent={GridRoot}
        {...{ attrs: this.$attrs, listeners: this.$listeners }}
      >
        {this.$slots.default}
      </GridBase>
    );
  },
  Root: GridRoot,
};
