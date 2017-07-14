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
} from 'react-router-dom';

import { Bootstrap3Demos } from './bootstrap3';
import { MaterialUIDemos } from './material-ui';

import './index.css';

const App = ({ router }) => {
  const Router = router === 'hash' ? HashRouter : MemoryRouter;

  return (
    <Router>
      <div>
        <Route path="/bootstrap3" component={Bootstrap3Demos} />
        <Route path="/material-ui" component={MaterialUIDemos} />
        <Route
          path="/"
          render={({ location }) => (
            (location.pathname.startsWith('/bootstrap3')
              || location.pathname.startsWith('/material-ui'))
            ? null
            : <Redirect push from={location.pathname} to={`/bootstrap3${location.pathname}`} />
          )}
        />
      </div>
    </Router>
  );
};

App.propTypes = {
  router: PropTypes.string,
};

App.defaultProps = {
  router: 'memory',
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
