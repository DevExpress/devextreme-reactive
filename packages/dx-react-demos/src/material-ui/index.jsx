import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue } from 'material-ui/colors';

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
import { ColumnReorderingDemos } from './column-reordering';
import { ImmutabilityDemos } from './immutability';
import { FeaturedDemos } from './featured';

injectTapEventPlugin();

const theme = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: blue,
  }),
});

const Demos = () => (
  <MuiThemeProvider theme={theme}>
    <div className="mui-demo-container">
      <Route
        exact
        path="/material-ui/"
        render={() => (
          <Redirect push from="/material-ui/" to="/material-ui/featured/uncontrolled-mode" />
        )}
      />

      <Route path="/material-ui/basic" component={BasicDemos} />
      <Route path="/material-ui/paging" component={PagingDemos} />
      <Route path="/material-ui/sorting" component={SortingDemos} />
      <Route path="/material-ui/filtering" component={FilteringDemos} />
      <Route path="/material-ui/editing" component={EditingDemos} />
      <Route path="/material-ui/selection" component={SelectionDemos} />
      <Route path="/material-ui/grouping" component={GroupingDemos} />
      <Route path="/material-ui/detail-row" component={DetailRowDemos} />
      <Route path="/material-ui/column-reordering" component={ColumnReorderingDemos} />
      <Route path="/material-ui/immutability" component={ImmutabilityDemos} />
      <Route path="/material-ui/featured" component={FeaturedDemos} />
    </div>
  </MuiThemeProvider>
);

const NavLink = withRouter(({ location, to, children }) => (
  location.pathname !== to
    ? <Link to={to}>{children}</Link>
    : <span>{children}</span>
));

export const MaterialUIDemos = withRouter(({ location }) => {
  const parts = location.pathname.split('/');
  return parts.length === 4
    ? <Demos />
    : (
      <div className="container">
        <div className="row">
          <div className="col-md-3 main-menu">
            <h3>Demos</h3>
            <ul className="list-unstyled">
              <li><NavLink to="/material-ui/basic">Basic</NavLink></li>
              <li><NavLink to="/material-ui/paging">Paging</NavLink></li>
              <li><NavLink to="/material-ui/sorting">Sorting</NavLink></li>
              <li><NavLink to="/material-ui/filtering">Filtering</NavLink></li>
              <li><NavLink to="/material-ui/selection">Selection</NavLink></li>
              <li><NavLink to="/material-ui/editing">Editing</NavLink></li>
              <li><NavLink to="/material-ui/grouping">Grouping</NavLink></li>
              <li><NavLink to="/material-ui/detail-row">Detail Row</NavLink></li>
              <li><NavLink to="/material-ui/column-reordering">Column Reordering</NavLink></li>
              <li><NavLink to="/material-ui/immutability">Immutability</NavLink></li>
              <li><NavLink to="/material-ui/featured">Featured</NavLink></li>
            </ul>
          </div>

          <div className="col-md-9 demo-content">
            <Demos />
          </div>
        </div>
      </div>
    );
});
