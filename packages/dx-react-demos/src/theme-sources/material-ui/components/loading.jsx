import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import './loading.css';

export const Loading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);
