import React from 'react';

import { RemoteDataDemo } from './featured/remote-data';

export const FeaturedRemoteDataDemos = () => (
  <div>
    <h1>DataGrid Remote Data</h1>
    <p>
      This demo shows the DataGrid capability to request specific data from the server.
      Properties received from the server and used in the query construction
      are managed by the parent component. You can display your own loading
      indicator during the server request processing.
    </p>
    <RemoteDataDemo />
    <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/bootstrap3/featured/remote-data.jsx">
      SOURCE CODE
    </a>
  </div>
);
