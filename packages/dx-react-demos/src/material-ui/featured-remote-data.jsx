import React from 'react';

import { RemoteDataDemo } from './featured/remote-data';

export const FeaturedRemoteDataDemos = () => (
  <div>
    <h1>Grid Remote Data</h1>
    <p>
      This demo shows how to bind the Grid to a remote data source.
      To perform a parametrized HTTP request to a web-service, handle
      Grid state change events to obtain the current grid state and create a query
      using the obtained state. This query should be correctly recognized by the data
      service. You can display your own loading indicator during request processing.
    </p>
    <RemoteDataDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/material-ui/featured/remote-data.jsx">
      SOURCE CODE
    </a>
  </div>
);
