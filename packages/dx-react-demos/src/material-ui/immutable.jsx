import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { ImmutableJSDemo } from './immutable/immutablejs';

const AllDemos = () => (
  <div>
    <h2>Immutable Demos</h2>
    <h3>ImmutableJS</h3>
    <ImmutableJSDemo />
  </div>
);

export const ImmutableDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/immutablejs`} component={ImmutableJSDemo} />
  </div>
);
ImmutableDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
