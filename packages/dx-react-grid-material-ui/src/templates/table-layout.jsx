import * as React from 'react';
import {
  TableLayout as TableLayoutCore,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';

export const TableLayout = props => (
  <TableLayoutCore
    layoutComponent={StaticTableLayout}
    {...props}
  />
);
