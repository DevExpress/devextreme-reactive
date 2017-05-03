import React from 'react';

import { VirtualScrollingDemo } from './featured/virtual-scrolling';

export const FeaturedVirtualScrollingDemos = () => (
  <div>
    <h1>DataGrid Virtual Scrolling (200K rows)</h1>
    <p>
      The virtual scrolling mode is an alternative to data paging. It allows end users to navigate
      data rows using the vertical scrollbar. In this demo, the DataGrid is bound to 200,000
      records and virtual scrolling is enabled using the VirtualTableView plugin.
    </p>
    <VirtualScrollingDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/virtual-scrolling.jsx">
      SOURCE CODE
    </a>
  </div>
);
