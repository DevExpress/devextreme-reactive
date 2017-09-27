import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'SortingState' },
];

const rowsComputed = ({ gridRows, sorting, getCellValue }) =>
  sortedRows(gridRows, sorting, getCellValue);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalSorting extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}
