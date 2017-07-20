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

class App extends React.Component {
  getChildContext() {
    const { scriptPath } = this.props;
    return { embeddedDemoOptions: { scriptPath } };
  }
  render() {
    const { router, path } = this.props;
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
  }
}

App.childContextTypes = {
  embeddedDemoOptions: PropTypes.object,
};

App.propTypes = {
  router: PropTypes.string,
  path: PropTypes.string,
  scriptPath: PropTypes.string,
};

App.defaultProps = {
  router: 'memory',
  path: undefined,
  scriptPath: '/dist/index.js',
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
