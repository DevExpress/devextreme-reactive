/* global document */

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { FeaturedUncontrolledDemos } from './bootstrap3/featured-uncontrolled';
import { FeaturedControlledDemos } from './bootstrap3/featured-controlled';
import { FeaturedVirtualScrollingDemos } from './bootstrap3/featured-virtual-scrolling';
import { FeaturedReduxDemos } from './bootstrap3/featured-redux';

import './index.css';

const Demos = () => (
  <div>
    <Route exact path="/" render={() => <Redirect push from="/" to="/featured-uncontrolled" />} />
    <Route path="/featured-uncontrolled" component={FeaturedUncontrolledDemos} />
    <Route path="/featured-controlled" component={FeaturedControlledDemos} />
    <Route path="/featured-virtual-scrolling" component={FeaturedVirtualScrollingDemos} />
    <Route path="/featured-redux" component={FeaturedReduxDemos} />
  </div>
);

const Container = withRouter(({ location }) => (
  location.pathname.split('/').length === 3
    ? <Demos />
    : (
      <div className="container">
        <div className="row">
          <div className="col-md-3 main-menu">
            <h3>Featured Demos</h3>
            <ul className="list-unstyled">
              <li><Link to="/featured-uncontrolled">Uncontrolled Mode</Link></li>
              <li><Link to="/featured-controlled">Controlled Mode</Link></li>
              <li><Link to="/featured-virtual-scrolling">Virtual Scrolling</Link></li>
              <li><Link to="/featured-redux-store">Redux Integration</Link></li>
            </ul>
          </div>

          <div className="col-md-9 demo-content">
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
