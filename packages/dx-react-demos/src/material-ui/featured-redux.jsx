import React from 'react';

import { ReduxIntegrationDemo } from './featured/redux-integration';

export const FeaturedReduxDemos = () => (
  <div>
    <h1>Grid Redux Integration</h1>
    <p>
      In this demo the Grid state is managed by the Redux store. Grid works as a
      stateless component. All end-user actions that modify the component state produce
      corresponding Redux actions that are dispatched by the Grid reducer.
      The Redux DevTool Extension is activated in the code of this demo. You can open it
      and perform time-traveling and observe Grid state mutations.
    </p>
    <ReduxIntegrationDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/material-ui/featured/redux-integration.jsx">
      SOURCE CODE
    </a>
  </div>
);
