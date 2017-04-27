import React from 'react';

import { ReduxIntegrationDemo } from './featured/redux-integration';

export const FeaturedReduxDemos = () => (
  <div>
    <h2>DataGrid Redux Integration</h2>
    <p>
      In this demo the DataGrid state is located in the Redux store. DataGrid works as stateless
      component. All end-user actions that modifiy state produce Redux actions that are dispatched
      by the data grid reducer. The <a href="https://github.com/zalmoxisus/redux-devtools-extension">
      Redux DevTool Extenstion</a> is activated in this demo. You can open it and perform
      time-traveling and observing state mutations.
    </p>
    <ReduxIntegrationDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/redux-integration.jsx">
      SOURCE CODE
    </a>
  </div>
);
