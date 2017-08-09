import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const PLUGIN_DEPENDENCIES = [
  { pluginName: 'GroupingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={PLUGIN_DEPENDENCIES}
      >
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
