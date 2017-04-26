import React from 'react';
import { Getter } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-datagrid-core';

// eslint-disable-next-line react/prefer-stateless-function
export class LocalFiltering extends React.PureComponent {
  render() {
    return (
      <Getter
        name="rows"
        pureComputed={filteredRows}
        connectArgs={getter => [
          getter('rows'),
          getter('filters'),
        ]}
      />
    );
  }
}
