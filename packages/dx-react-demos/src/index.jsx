/* global document */

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import { Bootstrap3Demos } from './bootstrap3';
import { MaterialUIDemos } from './material-ui';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Route path="/bootstrap3" component={Bootstrap3Demos} />
      <Route path="/material-ui" component={MaterialUIDemos} />
      <Route
        path="/"
        render={({ location }) => (
          (location.pathname.startsWith('/bootstrap3')
            || location.pathname.startsWith('/material-ui'))
          ? null
          : <Redirect push from={location.pathname} to={`/bootstrap3${location.pathname}`} />
        )}
      />
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
