import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { SeamlessImmutableDemo } from './immutable/seamless-immutable';

const AllDemos = () => (
  <div>
    <h2>Immutable Demos</h2>
    <h3>Seamless-Immutable as React state</h3>
    <SeamlessImmutableDemo />
  </div>
);

export const ImmutableDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/seamless-immutable`} component={SeamlessImmutableDemo} />
  </div>
);
ImmutableDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
