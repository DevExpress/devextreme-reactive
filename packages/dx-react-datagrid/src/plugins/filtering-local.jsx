import React from 'react';
import { Getter } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-datagrid-core';

export const LocalFiltering = () => (
  <Getter
    name="rows"
    pureComputed={filteredRows}
    connectArgs={getter => [
      getter('rows')(),
      getter('filters')(),
    ]}
  />
);
