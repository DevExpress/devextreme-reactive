/* global document */

import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  HashRouter,
  MemoryRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { DemoViewer } from './demo-viewer/demo-viewer';
import { SectionsViewer } from './demo-viewer/sections-viewer';

const App = ({ router, path }) => {
  const Router = router === 'hash' ? HashRouter : MemoryRouter;

  return (
    <Router
      initialEntries={path ? [path] : undefined}
    >
      <Switch>
        <Route path="/demo/:section/:demo" component={DemoViewer} />
        <Route path="/section" component={SectionsViewer} />
        <Redirect from="/" to="/section" />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  router: PropTypes.string,
  path: PropTypes.string,
};

App.defaultProps = {
  router: 'memory',
  path: undefined,
};


const embeddedDemoPlaceholders = document.getElementsByClassName('embedded-demo');
const embeddedDemoConfigs = [...embeddedDemoPlaceholders]
  .map(placeholder => ({
    options: JSON.parse(placeholder.getAttribute('data-options') || '{}'),
    placeholder,
  }));
embeddedDemoConfigs
  .forEach((config) => {
    ReactDOM.render(
      <App {...config.options} />,
      config.placeholder,
    );
  });
