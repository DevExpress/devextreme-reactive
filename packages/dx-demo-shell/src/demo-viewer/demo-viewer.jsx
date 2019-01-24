import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem, Tab } from 'react-bootstrap';

import { ThemeViewer } from './theme-viewer';
import { DemoFrame } from './demo-frame';
import { SourceCode } from './source-code';
import { EmbeddedDemoContext } from '../context';

export const DemoViewer = (
  { match: { params: { demoName, sectionName }, url } },
) => (
  <EmbeddedDemoContext.Consumer>
    {({ defaultTab, showThemeSelector, demoSources }) => (
      <Switch>
        <Route
          path={`${url}/:themeName/:variantName/clean`}
          render={({ match: { params: { themeName, variantName } } }) => (
            <div>
              <DemoFrame
                themeName={themeName}
                variantName={variantName}
                sectionName={sectionName}
                demoName={demoName}
              />
            </div>
          )}
        />
        <Route
          path={`${url}/:themeName/:variantName/perf/:samplesCount?`}
          render={({ match: { params: { themeName, variantName, samplesCount } } }) => (
            <div>
              <DemoFrame
                themeName={themeName}
                variantName={variantName}
                sectionName={sectionName}
                demoName={demoName}
                perfSamplesCount={Number(samplesCount) || 16}
              />
            </div>
          )}
        />
        <Route
          path={url}
          render={() => (
            <div style={{ paddingTop: '8px' }}>
              <ThemeViewer
                availableThemes={Object.keys(demoSources[sectionName][demoName])}
              >
                {({ themeName, variantName }) => (
                  <Tab.Container
                    id={`${sectionName}-${demoName}-demo`}
                    defaultActiveKey={defaultTab}
                  >
                    <div style={{ marginTop: showThemeSelector ? '-38px' : 0 }}>
                      <Nav bsStyle="tabs">
                        <NavItem eventKey="preview">
                      Preview
                        </NavItem>
                        <NavItem eventKey="source">
                      Source
                        </NavItem>
                      </Nav>
                      <Tab.Content
                        animation
                        mountOnEnter
                        unmountOnExit
                        style={{ marginTop: '20px' }}
                      >
                        <Tab.Pane eventKey="preview">
                          <DemoFrame
                            themeName={themeName}
                            variantName={variantName}
                            sectionName={sectionName}
                            demoName={demoName}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey="source">
                          <SourceCode
                            themeName={themeName}
                            sectionName={sectionName}
                            demoName={demoName}
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
    )}
  </EmbeddedDemoContext.Consumer>
);

DemoViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      demoName: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};
