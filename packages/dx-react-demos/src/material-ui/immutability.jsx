import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { SeamlessImmutableDemo } from './immutability/seamless-immutable';

const AllDemos = () => (
  <div>
    <h2>Immutability Demos</h2>
    <h3>Seamless-Immutable as React state</h3>
    <SeamlessImmutableDemo />
  </div>
);

export const ImmutabilityDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/seamless-immutable`} component={SeamlessImmutableDemo} />
  </div>
);
ImmutabilityDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
