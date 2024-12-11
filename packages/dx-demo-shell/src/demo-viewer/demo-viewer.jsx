/* eslint-disable max-len */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import { ThemeViewer } from './theme-viewer';
import { DemoFrame } from './demo-frame';
import { SourceCode } from './source-code';
import { EmbeddedDemoContext } from '../context';
import { DemoCodeProvider } from './demo-code-provider';
import { CodeSandBoxButton } from './codesandbox-button';
import './demo-viewer.css';

export class DemoViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'preview',
    };

    this.toggle = this.toggle.bind(this);
    this.getEditorInstance = this.getEditorInstance.bind(this);
    this.editorInstances = {};
  }

  componentDidUpdate() {
    const { activeTab } = this.state;
    if (this.editorInstances[activeTab]) {
      this.editorInstances[activeTab].refresh();
    }
  }

  getEditorInstance(tabId) {
    return (instance) => {
      this.editorInstances[tabId] = instance;
    };
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { match: { params: { demoName, sectionName }, url } } = this.props;
    const { activeTab } = this.state;

    return (
      <EmbeddedDemoContext.Consumer>
        {({
          showThemeSelector, themeSources, demoSources,
        }) => (
          <Switch>
            <Route
              path={`${url}/:themeName/:variantName/clean`}
              render={({ match: { params: { themeName, variantName } } }) => (
                <div className="demo-viewer">
                  <DemoCodeProvider
                    themeName={themeName}
                    variantName={variantName}
                    sectionName={sectionName}
                    demoName={demoName}
                    themeSources={themeSources}
                  >
                    {({ html }) => (
                      <DemoFrame
                        themeName={themeName}
                        variantName={variantName}
                        sectionName={sectionName}
                        demoName={demoName}
                        markup={html}
                      />
                    )}
                  </DemoCodeProvider>
                </div>
              )}
            />
            <Route
              path={url}
              render={() => (
                <div className="demo-viewer" style={{ paddingTop: '8px' }}>
                  <ThemeViewer
                    availableThemes={Object.keys(demoSources[sectionName][demoName])}
                  >
                    {({ themeName, variantName }) => (
                      <DemoCodeProvider
                        themeName={themeName}
                        variantName={variantName}
                        sectionName={sectionName}
                        demoName={demoName}
                        themeSources={themeSources}
                      >
                        {({
                          html, sandboxHtml, code, migrationSample, helperFiles, externalDeps,
                          onEditableLinkChange, editableLink, requireTs,
                        }) => (
                          <div
                            className={showThemeSelector ? 'theme-selector-displayed' : 'theme-selector-hidden'}
                          >
                            <Nav tabs>
                              <NavItem>
                                <NavLink
                                  tag="span"
                                  className={activeTab === 'preview' ? 'active' : ''}
                                  onClick={() => { this.toggle('preview'); }}
                                >
                                  Preview
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  tag="span"
                                  className={activeTab === 'source' ? 'active' : ''}
                                  onClick={() => { this.toggle('source'); }}
                                >
                                  Source
                                </NavLink>
                              </NavItem>
                              { migrationSample
                                && (
                                  <NavItem>
                                    <NavLink
                                      tag="span"
                                      className={activeTab === 'migration' ? 'active' : ''}
                                      onClick={() => { this.toggle('migration'); }}
                                    >
                                      Migration
                                    </NavLink>
                                  </NavItem>
                                )}
                              <NavItem>
                                <CodeSandBoxButton
                                  code={code}
                                  sandboxHtml={sandboxHtml}
                                  helperFiles={helperFiles}
                                  externalDeps={externalDeps}
                                  sectionName={sectionName}
                                  demoName={demoName}
                                  themeName={themeName}
                                  requireTs={requireTs}
                                  disabled={activeTab === 'migration'}
                                />
                              </NavItem>
                            </Nav>
                            <TabContent
                              activeTab={activeTab}
                              style={{ marginTop: '20px' }}
                            >
                              <TabPane tabId="preview">
                                <DemoFrame
                                  themeName={themeName}
                                  variantName={variantName}
                                  sectionName={sectionName}
                                  demoName={demoName}
                                  markup={html}
                                  onEditableLinkChange={onEditableLinkChange}
                                  editableLink={editableLink}
                                />
                              </TabPane>
                              <TabPane tabId="source">
                                <div className="alert-note">
                                  <div>
                                    <div className="part-title">Developing a React App? Check out our updated React UI Suite instead.</div>
                                    If you are considering React for an upcoming software project or
                                    have used DevExtreme Reactive components in the past, please visit&nbsp;
                                    <a
                                      href="https://js.devexpress.com/react/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      js.devexpress.com/react
                                    </a>
                                  </div>
                                </div>
                                <SourceCode
                                  themeName={themeName}
                                  sectionName={sectionName}
                                  demoName={demoName}
                                  getEditorInstance={this.getEditorInstance('source')}
                                  source={code}
                                />
                              </TabPane>
                              { migrationSample
                                && (
                                  <TabPane tabId="migration">
                                    <div className="alert-note">
                                      <div>
                                        <div className="part-title">Migrate to DevExtreme React</div>
                                        DevExtreme Reactive product line is now in maintenance support mode. If you&apos;re building a React app, consider our up-to-date DevExtreme React UI suite. For more information, visit the&nbsp;
                                        <a
                                          href="https://js.devexpress.com/React/Documentation/24_2/Guide/React_Components/Migrate_from_DevExtreme_Reactive/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Migrate from DevExtreme Reactive
                                        </a>
                                        &nbsp;help topic on the DevExtreme React site.
                                      </div>
                                    </div>
                                    <SourceCode
                                      sectionName={sectionName}
                                      demoName={demoName}
                                      getEditorInstance={this.getEditorInstance('migration')}
                                      source={migrationSample}
                                    />
                                  </TabPane>
                                )}
                            </TabContent>
                          </div>
                        )}
                      </DemoCodeProvider>
                    )}
                  </ThemeViewer>
                </div>
              )}
            />
          </Switch>
        )}
      </EmbeddedDemoContext.Consumer>
    );
  }
}

DemoViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      demoName: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};
