import React from 'react';
import { Route } from 'react-router-dom';

import { EditRowDemo } from './editing/edit-row';
import { EditRowControlledDemo } from './editing/edit-row-controlled';

const AllDemos = () => (
  <div>
    <h2>Editing Demos</h2>
    <h3>Edit Row with Command Column</h3>
    <EditRowDemo />
    <h3>Edit Row with Command Column (Controlled Mode)</h3>
    <EditRowControlledDemo />
  </div>
);

export const EditingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/edit-row`} component={EditRowDemo} />
    <Route path={`${match.url}/edit-row-controlled`} component={EditRowControlledDemo} />
  </div>
);
EditingDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
