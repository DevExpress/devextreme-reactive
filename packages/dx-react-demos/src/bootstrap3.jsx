import React from 'react';
import {
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
import { ColumnReorderingDemos } from './bootstrap3/column-reordering';
import { ImmutabilityDemos } from './bootstrap3/immutability';
import { FeaturedDemos } from './bootstrap3/featured';

const Demos = () => (
  <div>
    <Route
      exact
      path="/bootstrap3/"
      render={() => (
        <Redirect push from="/bootstrap3/" to="/bootstrap3/basic" />
      )}
    />

    <Route path="/bootstrap3/basic" component={BasicDemos} />
    <Route path="/bootstrap3/selection" component={SelectionDemos} />
    <Route path="/bootstrap3/sorting" component={SortingDemos} />
    <Route path="/bootstrap3/filtering" component={FilteringDemos} />
    <Route path="/bootstrap3/editing" component={EditingDemos} />
    <Route path="/bootstrap3/paging" component={PagingDemos} />
    <Route path="/bootstrap3/grouping" component={GroupingDemos} />
    <Route path="/bootstrap3/detail-row" component={DetailRowDemos} />
    <Route path="/bootstrap3/virtual-scrolling" component={VirtualScrollingDemos} />
    <Route path="/bootstrap3/column-reordering" component={ColumnReorderingDemos} />
    <Route path="/bootstrap3/immutability" component={ImmutabilityDemos} />
    <Route path="/bootstrap3/featured" component={FeaturedDemos} />
  </div>
);

const NavLink = withRouter(({ location, to, children }) => (
  location.pathname !== to
    ? <Link to={to}>{children}</Link>
    : <span>{children}</span>
));

export const Bootstrap3Demos = withRouter(({ location }) => {
  const parts = location.pathname.split('/');
  return parts.length === 4
    ? <Demos />
    : (
      <div className="container">
        <div className="row">
          <div className="col-md-3 main-menu">
            <h3>Demos</h3>
            <ul className="list-unstyled">
              <li><NavLink to="/bootstrap3/basic">Basic</NavLink></li>
              <li><NavLink to="/bootstrap3/sorting">Sorting</NavLink></li>
              <li><NavLink to="/bootstrap3/filtering">Filtering</NavLink></li>
              <li><NavLink to="/bootstrap3/paging">Paging</NavLink></li>
              <li><NavLink to="/bootstrap3/grouping">Grouping</NavLink></li>
              <li><NavLink to="/bootstrap3/selection">Selection</NavLink></li>
              <li><NavLink to="/bootstrap3/editing">Editing</NavLink></li>
              <li><NavLink to="/bootstrap3/detail-row">Detail Row</NavLink></li>
              <li><NavLink to="/bootstrap3/virtual-scrolling">Virtual Scrolling</NavLink></li>
              <li><NavLink to="/bootstrap3/column-reordering">Column Reordering</NavLink></li>
              <li><NavLink to="/bootstrap3/immutability">Immutability</NavLink></li>
              <li><NavLink to="/bootstrap3/featured">Featured</NavLink></li>
            </ul>
          </div>
          <div className="col-md-9 demo-content">
            <Demos />
          </div>
        </div>
      </div>
    );
});
