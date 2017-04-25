import React from 'react';
import { Route } from 'react-router-dom';

import { EditRowDemo } from './editing/edit-row';

const AllDemos = () => (
  <div>
    <h2>Editing Demos</h2>
    <h3>Edit Row with Command Column</h3>
    <EditRowDemo />
  </div>
);

export const EditingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/edit-row`} component={EditRowDemo} />
  </div>
);
EditingDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
