import * as React from 'react';
import { render } from 'react-dom';
import * as PropTypes from 'prop-types';
import {
  HashRouter,
  MemoryRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { DemoViewer } from './demo-viewer/demo-viewer';
import { SectionsViewer } from './demo-viewer/sections-viewer';
// import './index.css';

class App extends React.Component {
  getChildContext() {
    const {
      router, path, ...restProps
    } = this.props;

    return { embeddedDemoOptions: restProps };
  }
  render() {
    const { router, path } = this.props;
    const Router = router === 'hash' ? HashRouter : MemoryRouter;

    return (
      <Router
        initialEntries={path ? [path] : undefined}
      >
        <Switch>
          <Route path="/demo/:sectionName/:demoName" component={DemoViewer} />
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
  showThemeSelector: PropTypes.bool,
  showThemeVariants: PropTypes.bool,
  defaultTab: PropTypes.string,
};

App.defaultProps = {
  router: 'memory',
  path: undefined,
  scriptPath: '/dist/index.js',
  showThemeSelector: false,
  showThemeVariants: false,
  defaultTab: 'preview',
};

export const initialize = ({
  themeSources,
  demoSources,
  renderDemo,
  unmountDemo,
}) => {
  const embeddedDemoPlaceholders = document.getElementsByClassName('embedded-demo');
  const embeddedDemoConfigs = [...embeddedDemoPlaceholders]
    .map(placeholder => ({
      options: JSON.parse(placeholder.getAttribute('data-options') || '{}'),
      placeholder,
    }));
  embeddedDemoConfigs
    .forEach((config) => {
      render(
        <App
          {...config.options}
          themeSources={themeSources}
          demoSources={demoSources}
          renderDemo={renderDemo}
          unmountDemo={unmountDemo}
        />,
        config.placeholder,
      );
    });
};
