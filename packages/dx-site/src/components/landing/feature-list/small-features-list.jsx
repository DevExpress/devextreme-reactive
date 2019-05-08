 import * as React from 'react';
import * as PropTypes from 'prop-types';
import FeaturesListBase from './features-list-base';
import LandingSmallLayoutItem from './small-layout-item';
import SmallLayoutRow from './small-layout-row';

const FeaturesList = props => (
  <FeaturesListBase
    {...props}
    layoutRowComponent={SmallLayoutRow}
    layoutItemComponent={LandingSmallLayoutItem}
  />
);

export default FeaturesList;
