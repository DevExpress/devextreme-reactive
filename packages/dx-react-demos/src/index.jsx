/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { BasicDemos } from './bootstrap3/basic';
import { SortingDemos } from './bootstrap3/sorting';
import { SelectionDemos } from './bootstrap3/selection';
import { FullFeaturedDemos } from './bootstrap3/full-featured';

import './index.css';

const App = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h3>Simple Demos</h3>
          <ul className="list-unstyled">
            <li><Link to="/basic">Basic</Link></li>
            <li><Link to="/sorting">Sorting</Link></li>
            <li><Link to="/selection">Selection</Link></li>
            <li><Link to="/full-featured">Full Featured</Link></li>
          </ul>
        </div>

        <div className="col-md-9">
          <Route exact path="/" render={() => <Redirect push from="/" to="/basic" />} />

          <Route path="/basic" component={BasicDemos} />
          <Route path="/selection" component={SelectionDemos} />
          <Route path="/sorting" component={SortingDemos} />
          <Route path="/full-featured" component={FullFeaturedDemos} />
        </div>
      </div>
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
