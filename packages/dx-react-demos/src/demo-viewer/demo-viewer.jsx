import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { demos } from '../demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

const SourceCode = ({ theme, section, demo }) => (
  <div className="clearfix">
    <a
      className="pull-right"
      style={{
        marginTop: `${theme === 'bootstrap3' ? -10 : 10}px`,
      }}
      href={`https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/${theme}/${section}/${demo}.jsx`}
    >
      Source Code
    </a>
  </div>
);

SourceCode.propTypes = {
  section: PropTypes.string.isRequired,
  demo: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export const DemoViewer = ({
  match: { params: { demo: currentDemo, section: currentSection }, url },
}) => (
  <Switch>
    <Route
      path={`${url}/:theme/clean`}
      render={({ match: { params: { theme: currentTheme } } }) => (
        <div>
          <DemoRenderer
            theme={currentTheme}
            section={currentSection}
            demo={currentDemo}
          />
        </div>
      )}
    />
    <Route
      path={url}
      render={() => (
        <ThemeViewer
          avaliableThemes={Object.keys(demos[currentSection][currentDemo])}
        >
          {({ theme: currentTheme }) => (
            <div>
              <DemoRenderer
                theme={currentTheme}
                section={currentSection}
                demo={currentDemo}
              />
              <SourceCode
                theme={currentTheme}
                section={currentSection}
                demo={currentDemo}
              />
            </div>
          )}
        </ThemeViewer>
      )}
    />
  </Switch>
);

DemoViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string.isRequired,
      demo: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};
