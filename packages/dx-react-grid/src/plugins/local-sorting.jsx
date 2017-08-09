import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';

const rowsComputed = ({ rows, sorting }) => sortedRows(rows, sorting);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalSorting extends React.PureComponent {
  render() {
    return (
      <PluginContainer>
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}
