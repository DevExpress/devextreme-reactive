import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
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
import { EmbeddedDemoContext } from './context';

const App = ({ router, path, ...restProps }) => {
  const Router = router === 'hash' ? HashRouter : MemoryRouter;

  return (
    <EmbeddedDemoContext.Provider value={restProps}>
      <Router
        initialEntries={path ? [path] : undefined}
      >
        <Switch>
          <Route path="/demo/:sectionName/:demoName" component={DemoViewer} />
          <Route path="/section" component={SectionsViewer} />
          <Redirect from="/" to="/section" />
        </Switch>
      </Router>
    </EmbeddedDemoContext.Provider>
  );
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
  themeComponents,
  demoData,
}) => {
  const embeddedDemoPlaceholders = [...document.getElementsByClassName('embedded-demo')];
  const embeddedDemoConfigs = embeddedDemoPlaceholders
    .map(placeholder => ({
      options: JSON.parse(placeholder.getAttribute('data-options') || '{}'),
      placeholder,
    }));
  embeddedDemoConfigs
    .forEach((config) => {
      render(
        <App
          {...config.options}
          themeComponents={themeComponents}
          demoData={demoData}
          themeSources={themeSources}
          demoSources={demoSources}
          renderDemo={renderDemo}
          unmountDemo={unmountDemo}
        />,
        config.placeholder,
      );
    });

  window.deinitializeDemos = () => {
    embeddedDemoPlaceholders
      .forEach(placeholder => unmountComponentAtNode(placeholder));
  };
};
