import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-datagrid-core';

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    return (
      <PluginContainer>
        <Getter
          name="rows"
          pureComputed={groupedRows}
          connectArgs={getter => [
            getter('rows'),
            getter('groupedColumns'),
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
  }
}
