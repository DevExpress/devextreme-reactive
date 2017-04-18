import React from 'react';
import { Route } from 'react-router-dom';

import { SimpleDetailRowDemo } from './detail-row/simple-detail-row';
import { DetailRowControlledDemo } from './detail-row/detail-row-controlled';

const AllDemos = () => (
  <div>
    <h2>Detail Row Demos</h2>
    <h3>Simple Uncontrolled Detail Row</h3>
    <SimpleDetailRowDemo />
    <h3>Expanded State Controlled Mode</h3>
    <DetailRowControlledDemo />
  </div>
);

export const DetailRowDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/simple-detail-row`} component={SimpleDetailRowDemo} />
    <Route path={`${match.url}/detail-row-controlled`} component={DetailRowControlledDemo} />
  </div>
);
DetailRowDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
