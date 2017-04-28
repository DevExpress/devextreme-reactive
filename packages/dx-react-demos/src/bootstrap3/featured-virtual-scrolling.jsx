import React from 'react';

import { VirtualScrollingDemo } from './featured/virtual-scrolling';

export const FeaturedVirtualScrollingDemos = () => (
  <div>
    <h2>DataGrid Virtual Scrolling (200K rows)</h2>
    <VirtualScrollingDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/virtual-scrolling.jsx">
      SOURCE CODE
    </a>
  </div>
);
