import React from 'react';
import {
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { BasicDemos } from './basic';
import { SortingDemos } from './sorting';
import { FilteringDemos } from './filtering';
import { EditingDemos } from './editing';
import { PagingDemos } from './paging';
import { GroupingDemos } from './grouping';
import { SelectionDemos } from './selection';
import { DetailRowDemos } from './detail-row';
import { VirtualScrollingDemos } from './virtual-scrolling';
import { ColumnReorderingDemos } from './column-reordering';

import { FeaturedUncontrolledDemos } from './featured-uncontrolled';
import { FeaturedControlledDemos } from './featured-controlled';
import { FeaturedVirtualScrollingDemos } from './featured-virtual-scrolling';
import { FeaturedReduxDemos } from './featured-redux';
import { FeaturedRemoteDataDemos } from './featured-remote-data';

const Demos = () => (
  <div>
    <Route
      exact
      path="/bootstrap3/"
      render={() => (
        <Redirect push from="/bootstrap3/" to="/bootstrap3/featured-uncontrolled" />
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

    <Route path="/bootstrap3/featured-uncontrolled" component={FeaturedUncontrolledDemos} />
    <Route path="/bootstrap3/featured-controlled" component={FeaturedControlledDemos} />
    <Route path="/bootstrap3/featured-redux" component={FeaturedReduxDemos} />
    <Route path="/bootstrap3/featured-remote-data" component={FeaturedRemoteDataDemos} />
    <Route
      path="/bootstrap3/featured-virtual-scrolling"
      component={FeaturedVirtualScrollingDemos}
    />
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
            {
              (parts[2] && parts[2].indexOf('featured-') > -1)
                ? (
                  <ul className="list-unstyled">
                    <li>
                      <NavLink to="/bootstrap3/featured-uncontrolled">Uncontrolled Mode</NavLink>
                    </li>
                    <li><NavLink to="/bootstrap3/featured-controlled">Controlled Mode</NavLink></li>
                    <li>
                      <NavLink to="/bootstrap3/featured-virtual-scrolling">
                        Virtual Scrolling
                      </NavLink>
                    </li>
                    <li><NavLink to="/bootstrap3/featured-redux">Redux Integration</NavLink></li>
                    <li><NavLink to="/bootstrap3/featured-remote-data">Remote Data</NavLink></li>
                  </ul>
                  )
                : (
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
                    <li><NavLink to="/bootstrap3/">Featured</NavLink></li>
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
