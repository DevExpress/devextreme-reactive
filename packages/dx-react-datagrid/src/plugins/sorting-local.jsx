import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-datagrid-core';

export const LocalSorting = () => (
  <PluginContainer>
    <Getter
      name="rows"
      pureComputed={sortedRows}
      connectArgs={getter => [
        getter('rows'),
        getter('sortings'),
      ]}
    />
  </PluginContainer>
);
