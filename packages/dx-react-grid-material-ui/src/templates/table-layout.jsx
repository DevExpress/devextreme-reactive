import * as React from 'react';
import {
  TableLayout as TableLayoutCore,
  StaticTableLayout,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

export const TableLayout = props => (
  <TableLayoutCore
    layoutComponent={StaticTableLayout}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    {...props}
  />
);
