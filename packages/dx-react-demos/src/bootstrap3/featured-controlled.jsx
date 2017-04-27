import React from 'react';

import { ControlledModeDemo } from './featured/controlled-mode';

export const FeaturedControlledDemos = () => (
  <div>
    <h2>DataGrid Controlled State Mode</h2>
    <p>
      This demo shows the DataGrid capability to delegate its UI state managing to its parent
      component. This mode is usefull if you need to use DataGrid state in the other parts
      of your application UI. Using this mode you can also persist the overall DataGrid state
      or a part of it and restore it whenever you need.
    </p>
    <ControlledModeDemo />
  </div>
);
