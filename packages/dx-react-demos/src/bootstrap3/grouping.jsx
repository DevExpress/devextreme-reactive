import React from 'react';
import { Route } from 'react-router-dom';

import { LocalGroupingStaticDemo } from './grouping/local-grouping-static';
import { LocalGroupingWithUIDemo } from './grouping/local-grouping-with-ui';
import { LocalGroupingControlledDemo } from './grouping/local-grouping-controlled';

const AllDemos = () => (
  <div>
    <h2>Grouping Demos</h2>
    <h3>Static Local Grouping</h3>
    <LocalGroupingStaticDemo />
    <h3>Local Grouping with UI</h3>
    <LocalGroupingWithUIDemo />
    <h3>Controlled Grouping Mode</h3>
    <LocalGroupingControlledDemo />
  </div>
);

export const GroupingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/local-grouping-static`} component={LocalGroupingStaticDemo} />
    <Route path={`${match.url}/local-grouping-with-ui`} component={LocalGroupingWithUIDemo} />
    <Route path={`${match.url}/local-grouping-controlled`} component={LocalGroupingControlledDemo} />
  </div>
);
GroupingDemos.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string,
  }).isRequired,
};
