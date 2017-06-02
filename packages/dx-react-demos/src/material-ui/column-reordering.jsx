import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { UncontrolledDemo } from './column-reordering/uncontrolled';

const AllDemos = () => (
  <div>
    <h2>Column Reordering Demos</h2>
    <h3>Uncontrolled mode</h3>
    <UncontrolledDemo />
  </div>
);

export const ColumnReorderingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/uncontrolled`} component={UncontrolledDemo} />
  </div>
);

ColumnReorderingDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
