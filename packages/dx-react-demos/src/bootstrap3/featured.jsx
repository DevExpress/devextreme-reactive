import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { UncontrolledModeDemo } from './featured/uncontrolled-mode';
import { ControlledModeDemo } from './featured/controlled-mode';
import { VirtualScrollingDemo } from './featured/virtual-scrolling';
import { ReduxIntegrationDemo } from './featured/redux-integration';
import { RemoteDataDemo } from './featured/remote-data';

const AllDemos = () => (
  <div>
    <h2>Featured Demos</h2>
    <h3>Uncontrolled State Mode</h3>
    <UncontrolledModeDemo />
    <h3>Controlled State Mode</h3>
    <ControlledModeDemo />
    <h3>Virtual Scrolling (200K rows)</h3>
    <VirtualScrollingDemo />
    <h3>Redux Integration</h3>
    <ReduxIntegrationDemo />
    <h3>Remote Data Binding</h3>
    <RemoteDataDemo />
  </div>
);

export const FeaturedDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/uncontrolled-mode`} component={UncontrolledModeDemo} />
    <Route path={`${match.url}/controlled-mode`} component={ControlledModeDemo} />
    <Route path={`${match.url}/virtual-scrolling`} component={VirtualScrollingDemo} />
    <Route path={`${match.url}/redux-integration`} component={ReduxIntegrationDemo} />
    <Route path={`${match.url}/remote-data`} component={RemoteDataDemo} />
  </div>
);
FeaturedDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
