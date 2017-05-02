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
                    <li><Link to="/featured-uncontrolled">Uncontrolled Mode</Link></li>
                    <li><Link to="/featured-controlled">Controlled Mode</Link></li>
                    <li><Link to="/featured-virtual-scrolling">Virtual Scrolling</Link></li>
                    <li><Link to="/featured-redux">Redux Integration</Link></li>
                    <li><Link to="/featured-remote-data">Remote Data</Link></li>
                  </ul>
                  )
                : (
                  <ul className="list-unstyled">
                    <li><Link to="/basic">Basic</Link></li>
                    <li><Link to="/sorting">Sorting</Link></li>
                    <li><Link to="/filtering">Filtering</Link></li>
                    <li><Link to="/paging">Paging</Link></li>
                    <li><Link to="/grouping">Grouping</Link></li>
                    <li><Link to="/selection">Selection</Link></li>
                    <li><Link to="/editing">Editing</Link></li>
                    <li><Link to="/detail-row">Detail Row</Link></li>
                    <li><Link to="/virtual-scrolling">Virtual Scrolling</Link></li>
                    <li><Link to="/redux">Redux</Link></li>
                    <li><Link to="/">Featured</Link></li>
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
