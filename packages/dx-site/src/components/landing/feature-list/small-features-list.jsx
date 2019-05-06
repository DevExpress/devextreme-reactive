 import * as React from 'react';
import * as PropTypes from 'prop-types';
import FeaturesListBase from './features-list-base';
import LandingSmallLayoutItem from './small-layout-item';

const FeaturesList = props => (
  <FeaturesListBase
    {...props}
    rowLength={4}
    layoutItemComponent={LandingSmallLayoutItem}
  />
);

export default FeaturesList;
