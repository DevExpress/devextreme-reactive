import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { ThemingDemo } from './featured-theming/theming';

const AllDemos = () => (
  <div>
    <h2>Featured Theming Demos</h2>
    <h3>Theming</h3>
    <ThemingDemo />
  </div>
);

export const FeaturedThemingDemos = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/`} component={AllDemos} />
    <Route path={`${match.url}/theming`} component={ThemingDemo} />
  </div>
);
FeaturedThemingDemos.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
