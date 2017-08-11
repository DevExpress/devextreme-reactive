import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows, getColumnByName } from '@devexpress/dx-grid-core';

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
            getter('grouping'),
            (row, columnName) => (
              getter('getCellData')(
                row,
                getColumnByName(getter('columns'), columnName),
              )
            ),
          ]}
        />
        <Getter
          name="rows"
          pureComputed={expandedGroupRows}
          connectArgs={getter => [
            getter('rows'),
            getter('grouping'),
            getter('expandedGroups'),
          ]}
        />
      </PluginContainer>
    );
  }
}
