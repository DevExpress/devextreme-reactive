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

import { BasicDemos } from './bootstrap3/basic';
import { SortingDemos } from './bootstrap3/sorting';
import { FilteringDemos } from './bootstrap3/filtering';
import { EditingDemos } from './bootstrap3/editing';
import { PagingDemos } from './bootstrap3/paging';
import { GroupingDemos } from './bootstrap3/grouping';
import { SelectionDemos } from './bootstrap3/selection';
import { DetailRowDemos } from './bootstrap3/detail-row';
import { VirtualScrollingDemos } from './bootstrap3/virtual-scrolling';
import { ReduxDemos } from './bootstrap3/redux';

import { FeaturedUncontrolledDemos } from './bootstrap3/featured-uncontrolled';
import { FeaturedControlledDemos } from './bootstrap3/featured-controlled';
import { FeaturedVirtualScrollingDemos } from './bootstrap3/featured-virtual-scrolling';
import { FeaturedReduxDemos } from './bootstrap3/featured-redux';
import { FeaturedRemoteDataDemos } from './bootstrap3/featured-remote-data';

import './index.css';

const Demos = () => (
  <div>
    <Route exact path="/" render={() => <Redirect push from="/" to="/featured-uncontrolled" />} />

    <Route path="/basic" component={BasicDemos} />
    <Route path="/selection" component={SelectionDemos} />
    <Route path="/sorting" component={SortingDemos} />
    <Route path="/filtering" component={FilteringDemos} />
    <Route path="/editing" component={EditingDemos} />
    <Route path="/paging" component={PagingDemos} />
    <Route path="/grouping" component={GroupingDemos} />
    <Route path="/detail-row" component={DetailRowDemos} />
    <Route path="/virtual-scrolling" component={VirtualScrollingDemos} />
    <Route path="/redux" component={ReduxDemos} />

    <Route path="/featured-uncontrolled" component={FeaturedUncontrolledDemos} />
    <Route path="/featured-controlled" component={FeaturedControlledDemos} />
    <Route path="/featured-virtual-scrolling" component={FeaturedVirtualScrollingDemos} />
    <Route path="/featured-redux" component={FeaturedReduxDemos} />
    <Route path="/featured-remote-data" component={FeaturedRemoteDataDemos} />
  </div>
);

const NavLink = withRouter(({ location, to, children }) => (
  location.pathname !== to
    ? <Link to={to}>{children}</Link>
    : <span>{children}</span>
));

const Container = withRouter(({ location }) => {
  const parts = location.pathname.split('/');
  return parts.length === 3
    ? <Demos />
    : (
      <div className="container">
        <div className="row">
          <div className="col-md-3 main-menu">
            <h3>Demos</h3>
            {
              (parts[1].indexOf('featured-') > -1)
                ? (
                  <ul className="list-unstyled">
                    <li><NavLink to="/featured-uncontrolled">Uncontrolled Mode</NavLink></li>
                    <li><NavLink to="/featured-controlled">Controlled Mode</NavLink></li>
                    <li><NavLink to="/featured-virtual-scrolling">Virtual Scrolling</NavLink></li>
                    <li><NavLink to="/featured-redux">Redux Integration</NavLink></li>
                    <li><NavLink to="/featured-remote-data">Remote Data</NavLink></li>
                  </ul>
                  )
                : (
                  <ul className="list-unstyled">
                    <li><NavLink to="/basic">Basic</NavLink></li>
                    <li><NavLink to="/sorting">Sorting</NavLink></li>
                    <li><NavLink to="/filtering">Filtering</NavLink></li>
                    <li><NavLink to="/paging">Paging</NavLink></li>
                    <li><NavLink to="/grouping">Grouping</NavLink></li>
                    <li><NavLink to="/selection">Selection</NavLink></li>
                    <li><NavLink to="/editing">Editing</NavLink></li>
                    <li><NavLink to="/detail-row">Detail Row</NavLink></li>
                    <li><NavLink to="/virtual-scrolling">Virtual Scrolling</NavLink></li>
                    <li><NavLink to="/redux">Redux</NavLink></li>
                    <li><NavLink to="/">Featured</NavLink></li>
                  </ul>
                )
            }
          </div>

          <div className="col-md-9 demo-content">
            <Demos />
          </div>
        </div>
      </div>
    );
});

const App = () => (
  <Router>
    <Container />
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
