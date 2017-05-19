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
      <Route exact path="/" render={() => <Redirect push from="/" to="/bootstrap3" />} />
      <Route path="/bootstrap3" component={Bootstrap3Demos} />
      <Route path="/material-ui" component={MaterialUIDemos} />
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
