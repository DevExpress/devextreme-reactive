import React from 'react';

import { UncontrolledModeDemo } from './featured/uncontrolled-mode';

export const FeaturedUncontrolledDemos = () => (
  <div>
    <h1>DataGrid Uncontrolled State Mode</h1>
    <p>
      This demo shows the DataGrid capability to manage its UI state internally. This mode is
      usefull if you do not need to use the DataGrid state in other parts of your application.
      Also, it can be useful if you are just prototyping your application and do not want to
      spend time on learning what this state consists of. If you just need to display your data
      and analyse it using DataGrid features, such as sorting, grouping, filtering, etc., you will
      also find the uncontrolled state mode helpful.
    </p>
    <UncontrolledModeDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/uncontrolled-mode.jsx">
      SOURCE CODE
    </a>
  </div>
);
