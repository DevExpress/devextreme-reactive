import React from 'react';

import { UncontrolledModeDemo } from './featured/uncontrolled-mode';

export const FeaturedUncontrolledDemos = () => (
  <div>
    <h2>DataGrid Uncontrolled State Mode</h2>
    <p>
      This demo shows the DataGrid capability of managing its UI state internally.
      This mode is usefull if you do not need to use DataGrid state in the other parts
      of your application UI. Also it might be handy if you are just prototyping your
      application and dont want to spend time on figuring out what this state is.
      If you have some data and want just to display and analyse it using DataGrid
      features such as sorting, grouping, filtering, etc. you will also like the
      uncontrolled state mode.
    </p>
    <UncontrolledModeDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/uncontrolled-mode.jsx">
      SOURCE CODE
    </a>
  </div>
);
