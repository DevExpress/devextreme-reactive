import React from 'react';

import { RemoteDataDemo } from './featured/remote-data';

export const FeaturedRemoteDataDemos = () => (
  <div>
    <h1>Grid Remote Data</h1>
    <p>
      This demo shows the Grid capability to be bound to remote data.
      To perform a parametrized HTTP request to a web-service, you can handle
      the Grid state change events and use the state to construct a query that the
      data service can understand and respond with a corresponding set of rows.
      You can display your own loading indicator during the server request processing.
    </p>
    <RemoteDataDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/remote-data.jsx">
      SOURCE CODE
    </a>
  </div>
);
