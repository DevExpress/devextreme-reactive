import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import { ThemeViewer } from './theme-viewer';
import { DemoFrame } from './demo-frame';
import { SourceCode } from './source-code';
import { EmbeddedDemoContext } from '../context';

export class DemoViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'preview',
    };

    this.toggle = this.toggle.bind(this);
    this.getEditorInstance = this.getEditorInstance.bind(this);
    this.editorInstance = null;
  }

  componentDidUpdate() {
    const { activeTab } = this.state;
    if (activeTab === 'source') {
      this.editorInstance.refresh();
    }
  }

  getEditorInstance(instance) {
    this.editorInstance = instance;
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
        {({ showThemeSelector, demoSources }) => (
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
              path={url}
              render={() => (
                <div style={{ paddingTop: '8px' }}>
                  <ThemeViewer
                    availableThemes={Object.keys(demoSources[sectionName][demoName])}
                  >
                    {({ themeName, variantName }) => (
                      <div style={{ marginTop: showThemeSelector ? '-42px' : 0 }}>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={activeTab === 'preview' ? 'active' : ''}
                              onClick={() => { this.toggle('preview'); }}
                            >
                              Preview
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeTab === 'source' ? 'active' : ''}
                              onClick={() => { this.toggle('source'); }}
                            >
                              Source
                            </NavLink>
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
                            />
                          </TabPane>
                          <TabPane tabId="source">
                            <SourceCode
                              themeName={themeName}
                              sectionName={sectionName}
                              demoName={demoName}
                              getEditorInstance={this.getEditorInstance}
                            />
                          </TabPane>
                        </TabContent>
                      </div>
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
