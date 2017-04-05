/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import {
  Navbar,
  NavItem,
  Nav,
} from 'react-bootstrap';

import { BasicDemos } from './bootstrap3/basic';
import { SelectionDemos } from './bootstrap3/selection';
import { FullFeaturedDemos } from './bootstrap3/full-featured';

import './index.css';

const Heading = withRouter(({ history }) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">DevExtreme Reactive</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="/demos" onClick={() => history.push('/demos')}>Demos</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
));

const Home = () => (
  <div className="container">
    <div className="jumbotron">
      <h1>Components for React</h1>
      <p>Long waited and highly wanted buisness controls from DevExpress.</p>
    </div>
  </div>
);

const Demos = ({ match }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <ul className="list-unstyled">
          <li><Link to={`${match.url}/basic`} >Basic</Link></li>
          <li><Link to={`${match.url}/selection`}>Selection</Link></li>
          <li><Link to={`${match.url}/full-featured`}>Full Featured</Link></li>
        </ul>
      </div>

      <div className="col-md-9">
        <Route exact path={`${match.url}/`} render={() => <Redirect to={`${match.url}/basic`} />} />

        <Route path={`${match.url}/basic`} component={BasicDemos} />
        <Route path={`${match.url}/selection`} component={SelectionDemos} />
        <Route path={`${match.url}/full-featured`} component={FullFeaturedDemos} />
      </div>
    </div>
  </div>
);
Demos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
  }).isRequired,
};

const App = () => (
  <Router>
    <div>
      <Heading />

      <Route exact path="/" component={Home} />
      <Route path="/demos" component={Demos} />
    </div>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
