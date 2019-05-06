import * as React from 'react';
import * as PropTypes from 'prop-types';
import FeaturesListBase from './features-list-base';
import LandingLayoutItem from './layout-item';

const FeaturesList = props => (
  <FeaturesListBase
    {...props}
    rowLength={2}
    layoutItemComponent={LandingLayoutItem}
  />
);

export default FeaturesList;
