import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-datagrid-core';

export const LocalGrouping = () => (
  <PluginContainer>
    <Getter
      name="rows"
      pureComputed={groupedRows}
      connectArgs={getter => [
        getter('rows'),
        getter('grouping'),
      ]}
    />
    <Getter
      name="rows"
      pureComputed={expandedGroupRows}
      connectArgs={getter => [
        getter('rows'),
        getter('expandedGroups'),
      ]}
    />
  </PluginContainer>
);
