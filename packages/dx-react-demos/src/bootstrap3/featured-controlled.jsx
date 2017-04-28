import React from 'react';

import { ControlledModeDemo } from './featured/controlled-mode';

export const FeaturedControlledDemos = () => (
  <div>
    <h2>DataGrid Controlled State Mode</h2>
    <p>
      This demo shows the DataGrid capability to delegate its UI state management to its parent
      component. You can contol either the whole DataGrid state or just a piece of its. In the
      first case DataGrid becomes a stateless component. This mode is usefull if you need
      to use DataGrid state in the other parts of your application. Using this mode you
      can also persist state and restore it when you need it.
    </p>
    <ControlledModeDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/controlled-mode.jsx">
      SOURCE CODE
    </a>
  </div>
);
