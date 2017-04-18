import React from 'react';
import { Route } from 'react-router-dom';

import { BasicDemo } from './virtual-scrolling/basic';
import { IntegrationWithOtherPluginsDemo } from './virtual-scrolling/integration-with-other-plugins';

const AllDemos = () => (
  <div>
    <h2>Virtual Scrolling Demos</h2>
    <h3>Basic Setup</h3>
    <BasicDemo />
    <h3>Integration with Other Plugins</h3>
    <IntegrationWithOtherPluginsDemo />
  </div>
);

export const VirtualScrollingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/basic`} component={BasicDemo} />
    <Route path={`${match.url}/integration-with-other-plugins`} component={IntegrationWithOtherPluginsDemo} />
  </div>
);
VirtualScrollingDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
