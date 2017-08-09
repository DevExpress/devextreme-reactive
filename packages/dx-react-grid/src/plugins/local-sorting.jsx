import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const PLUGIN_DEPENDENCIES = [
  { pluginName: 'SortingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class LocalSorting extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalSorting"
        dependencies={PLUGIN_DEPENDENCIES}
      >
        <Getter
          name="rows"
          pureComputed={sortedRows}
          connectArgs={getter => [
            getter('rows'),
            getter('sorting'),
          ]}
        />
      </PluginContainer>
    );
  }
}
