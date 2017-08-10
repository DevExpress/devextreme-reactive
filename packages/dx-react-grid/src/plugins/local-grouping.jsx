import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { groupedRows, expandedGroupRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'GroupingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class LocalGrouping extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalGrouping"
        dependencies={pluginDependencies}
      >
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
            getter('grouping'),
            getter('expandedGroups'),
          ]}
        />
      </PluginContainer>
    );
  }
}
