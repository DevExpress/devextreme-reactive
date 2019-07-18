import * as React from 'react';
import './loading.css';
import { some } from './some-local-deps';

export const Loading = () => (
  <div className="loading-shading">
    <span className="glyphicon glyphicon-refresh loading-icon" />
  </div>
);
