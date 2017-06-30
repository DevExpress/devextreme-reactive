import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { FacebookImmutableDemo } from './immutable/facebook-immutable';

const AllDemos = () => (
  <div>
    <h2>Immutable Demos</h2>
    <h3>Facebook immutable</h3>
    <FacebookImmutableDemo />
  </div>
);

export const ImmutableDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/facebook-immutable`} component={FacebookImmutableDemo} />
  </div>
);
ImmutableDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
