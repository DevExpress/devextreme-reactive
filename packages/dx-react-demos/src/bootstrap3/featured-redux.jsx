import React from 'react';

import { ReduxIntegrationDemo } from './featured/redux-integration';

export const FeaturedReduxDemos = () => (
  <div>
    <h1>DataGrid Redux Integration</h1>
    <p>
      In this demo the DataGrid state is managed by the Redux store. DataGrid works as a
      stateless component. All end-user actions that modify the component state produce
      corresponding Redux actions that are dispatched by the DataGrid reducer.
      The Redux DevTool Extension is activated in the code of this demo. You can open it
      and perform time-traveling and observe DataGrid state mutations.
    </p>
    <ReduxIntegrationDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/redux-integration.jsx">
      SOURCE CODE
    </a>
  </div>
);
