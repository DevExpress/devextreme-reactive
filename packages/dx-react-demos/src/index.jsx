/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { BasicDemos } from './bootstrap3/basic';
import { SortingDemos } from './bootstrap3/sorting';
import { FilteringDemos } from './bootstrap3/filtering';
import { PagingDemos } from './bootstrap3/paging';
import { GroupingDemos } from './bootstrap3/grouping';
import { SelectionDemos } from './bootstrap3/selection';
import { FullFeaturedDemos } from './bootstrap3/full-featured';
import { ReduxDemos } from './bootstrap3/redux';

import './index.css';

const Demos = () => (
  <div>
    <Route exact path="/" render={() => <Redirect push from="/" to="/basic" />} />

    <Route path="/basic" component={BasicDemos} />
    <Route path="/selection" component={SelectionDemos} />
    <Route path="/sorting" component={SortingDemos} />
    <Route path="/filtering" component={FilteringDemos} />
    <Route path="/paging" component={PagingDemos} />
    <Route path="/grouping" component={GroupingDemos} />
    <Route path="/full-featured" component={FullFeaturedDemos} />
    <Route path="/redux" component={ReduxDemos} />
  </div>
);

const Container = withRouter(({ location }) => (
  location.pathname.split('/').length === 3
    ? <Demos />
    : (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Simple Demos</h3>
            <ul className="list-unstyled">
              <li><Link to="/basic">Basic</Link></li>
              <li><Link to="/sorting">Sorting</Link></li>
              <li><Link to="/filtering">Filtering</Link></li>
              <li><Link to="/paging">Paging</Link></li>
              <li><Link to="/grouping">Grouping</Link></li>
              <li><Link to="/selection">Selection</Link></li>
              <li><Link to="/full-featured">Full Featured</Link></li>
              <li><Link to="/redux">Redux</Link></li>
            </ul>
          </div>

          <div className="col-md-9">
            <Demos />
          </div>
        </div>
      </div>
    )
));

const App = () => (
  <Router>
    <Container />
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
