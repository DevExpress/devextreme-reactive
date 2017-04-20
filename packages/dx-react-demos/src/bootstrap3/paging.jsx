import React from 'react';
import { Route } from 'react-router-dom';

import { LocalPagingDemo } from './paging/local-paging';
import { LocalPagingControlledDemo } from './paging/local-paging-controlled';
import { RemotePagingDemo } from './paging/remote-paging';

const AllDemos = () => (
  <div>
    <h2>Paging Demos</h2>
    <h3>Local paging</h3>
    <LocalPagingDemo />
    <h3>Controlled mode</h3>
    <LocalPagingControlledDemo />
    <h3>Remote paging</h3>
    <RemotePagingDemo />
  </div>
);

export const PagingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/local-paging`} component={LocalPagingDemo} />
    <Route path={`${match.url}/local-paging-controlled`} component={LocalPagingControlledDemo} />
    <Route path={`${match.url}/remote-paging`} component={RemotePagingDemo} />
  </div>
);
PagingDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
