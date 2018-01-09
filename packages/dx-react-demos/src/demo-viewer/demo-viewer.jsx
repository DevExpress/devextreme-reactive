import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem, Tab } from 'react-bootstrap';

import { demos } from '../demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';
import { SourceCode } from './source-code';

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
        <div style={{ paddingTop: '8px' }}>
          <ThemeViewer
            avaliableThemes={Object.keys(demos[currentSection][currentDemo])}
          >
            {({ theme: currentTheme }) => (
              <Tab.Container
                id={`${currentSection}-${currentDemo}-demo`}
                defaultActiveKey="preview"
              >
                <div style={{ marginTop: '-38px' }}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="preview">Preview</NavItem>
                    <NavItem eventKey="source">Source</NavItem>
                  </Nav>
                  <Tab.Content
                    animation
                    mountOnEnter
                    style={{ marginTop: '20px' }}
                  >
                    <Tab.Pane eventKey="preview">
                      <DemoRenderer
                        theme={currentTheme}
                        section={currentSection}
                        demo={currentDemo}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="source">
                      <SourceCode
                        theme={currentTheme}
                        section={currentSection}
                        demo={currentDemo}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            )}
          </ThemeViewer>
        </div>
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
