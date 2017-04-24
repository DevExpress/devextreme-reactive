import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { HeaderSortingDemo } from './sorting/local-header-sorting';
import { LocalSortingControlledDemo } from './sorting/local-sorting-controlled';
import { LocalGroupSortingDemo } from './sorting/local-group-sorting';

const AllDemos = () => (
  <div>
    <h2>Sorting Demos</h2>
    <h3>Basic sorting</h3>
    <HeaderSortingDemo />
    <h3>Sorting with grouping</h3>
    <LocalGroupSortingDemo />
    <h3>Controlled mode</h3>
    <LocalSortingControlledDemo />
  </div>
);

export const SortingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/local-header-sorting`} component={HeaderSortingDemo} />
    <Route path={`${match.url}/local-group-sorting`} component={LocalGroupSortingDemo} />
    <Route path={`${match.url}/local-sorting-controlled`} component={LocalSortingControlledDemo} />
  </div>
);
SortingDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
