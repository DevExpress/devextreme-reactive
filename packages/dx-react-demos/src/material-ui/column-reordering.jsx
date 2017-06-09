import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { UncontrolledDemo } from './column-reordering/uncontrolled';
import { ControlledDemo } from './column-reordering/controlled';

const AllDemos = () => (
  <div>
    <h2>Column Reordering Demos</h2>
    <h3>Uncontrolled mode</h3>
    <UncontrolledDemo />
    <h3>Controlled mode</h3>
    <ControlledDemo />
  </div>
);

export const ColumnReorderingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/uncontrolled`} component={UncontrolledDemo} />
    <Route path={`${match.url}/controlled`} component={ControlledDemo} />
  </div>
);

ColumnReorderingDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
