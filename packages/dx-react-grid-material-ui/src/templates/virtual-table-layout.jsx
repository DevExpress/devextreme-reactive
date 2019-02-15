import * as React from 'react';
import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-react-grid';

export const VirtualTableLayout = props => (
  <TableLayout
    layoutComponent={VirtualTableLayoutCore}
    {...props}
  />
);
