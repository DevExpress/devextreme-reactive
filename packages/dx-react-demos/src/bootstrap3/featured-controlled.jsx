import React from 'react';

import { ControlledModeDemo } from './featured/controlled-mode';

export const FeaturedControlledDemos = () => (
  <div>
    <h1>DataGrid Controlled State Mode</h1>
    <p>
      This demo shows the DataGrid capability to delegate its UI state management to the parent
      component. You can contol either the whole DataGrid state or just a part of it. In the
      first case, DataGrid becomes a stateless component. This mode is usefull if you need
      to use the DataGrid state in other parts of your application. Using this mode, you
      can also persist the component state and restore it when required.
    </p>
    <ControlledModeDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/controlled-mode.jsx">
      SOURCE CODE
    </a>
  </div>
);
