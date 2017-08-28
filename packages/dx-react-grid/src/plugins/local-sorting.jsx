import React from 'react';
import { Property, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

const rowsComputed = ({ rows, sorting, getCellData }) => sortedRows(rows, sorting, getCellData);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalSorting extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalSorting"
        dependencies={pluginDependencies}
      >
        <Property name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}
