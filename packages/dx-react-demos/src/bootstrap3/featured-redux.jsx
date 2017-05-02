import React from 'react';

import { ReduxIntegrationDemo } from './featured/redux-integration';

export const FeaturedReduxDemos = () => (
  <div>
    <h2>DataGrid Redux Integration</h2>
    <p>
      In this demo the DataGrid state is managed by the Redux store. DataGrid works as
      stateless component. All end-user actions that modifiy state produce corresponding
      Redux actions that are dispatched by the DataGrid reducer.
      The Redux DevTool Extenstion is activated in the code of this demo. You can open it
      and perform time-traveling and observe the DataGrid state mutations.
    </p>
    <ReduxIntegrationDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/redux-integration.jsx">
      SOURCE CODE
    </a>
  </div>
);
