import React from 'react';

import { VirtualScrollingDemo } from './featured/virtual-scrolling';

export const FeaturedVirtualScrollingDemos = () => (
  <div>
    <h2>DataGrid Virtual Scrolling (200K rows)</h2>
    <p>
      Virtual scrolling mode is an alternative to data paging. It allows end users to navigate the
      data rows by using its vertical scrollbar. In this demo, the DataGrid is bound to 200,000
      records and virtual scrolling is enabled by using the <i>VirtualTableView</i> plugin.
    </p>
    <VirtualScrollingDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/virtual-scrolling.jsx">
      SOURCE CODE
    </a>
  </div>
);
