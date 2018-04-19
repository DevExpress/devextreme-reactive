import * as React from 'react';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';

const MINIMAL_COLUMN_WIDTH = 120;

export const VirtualTableLayout = props => (
  <TableLayout
    layoutComponent={VirtualTableLayoutCore}
    minColumnWidth={MINIMAL_COLUMN_WIDTH}
    {...props}
  />
);
