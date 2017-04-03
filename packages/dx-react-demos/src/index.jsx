/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import { FullFeaturedControlledDemo } from './full-featured-controlled';
import { FullFeaturedUncontrolledDemo } from './full-featured-uncontrolled';
import { UncontrolledVirtualDemo } from './uncontrolled-virtual';
import { UncontrolledGroupedVirtualDemo } from './uncontrolled-grouped-virtual';
import { SelectAllByAllPagesDemo } from './selection/by-all-pages';
import { SelectAllByPageDemo } from './selection/by-page';
import './index.css';

const App = () => (
  <div>
    <h1>Demo Index</h1>

    <div>
      <h2>Selection Demos</h2>
      <SelectAllByPageDemo />
      <SelectAllByAllPagesDemo />
    </div>
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
