import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { LocalFilterRowDemo } from './filtering/local-filter-row';
import { CustomFilterRowDemo } from './filtering/custom-filter-row';
import { LocalFilteringControlledDemo } from './filtering/local-filtering-controlled';

const AllDemos = () => (
  <div>
    <h2>Filtering Demos</h2>
    <h3>Local Filtering via Filter Row</h3>
    <LocalFilterRowDemo />
    <h3>Custom Filtering via Filter Row</h3>
    <CustomFilterRowDemo />
    <h3>Filtering Controlled Mode</h3>
    <LocalFilteringControlledDemo />
  </div>
);

export const FilteringDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/local-filter-row`} component={LocalFilterRowDemo} />
    <Route path={`${match.url}/custom-filter-row`} component={CustomFilterRowDemo} />
    <Route path={`${match.url}/local-filtering-controlled`} component={LocalFilteringControlledDemo} />
  </div>
);
FilteringDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
