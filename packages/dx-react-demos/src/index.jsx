/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { FullFeaturedControlledDemo } from './full-featured-controlled';
import { FullFeaturedUncontrolledDemo } from './full-featured-uncontrolled';
import { UncontrolledVirtualDemo } from './uncontrolled-virtual';
import { UncontrolledGroupedVirtualDemo } from './uncontrolled-grouped-virtual';
import './index.css';

const App = () => (
  <div>
    <h1>Demo Index</h1>

    <FullFeaturedControlledDemo />
    <FullFeaturedUncontrolledDemo />
    <UncontrolledVirtualDemo />
    <UncontrolledGroupedVirtualDemo />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
