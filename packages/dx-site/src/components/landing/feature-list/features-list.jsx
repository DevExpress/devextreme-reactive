import * as React from 'react';
import * as PropTypes from 'prop-types';
import FeaturesListBase from './features-list-base';
import LandingLayoutItem from './layout-item';
import LandingLayoutRow from './layout-row';

const FeaturesList = props => (
  <FeaturesListBase
    {...props}
    rowLength={2}
    layoutRowComponent={LandingLayoutRow}
    layoutItemComponent={LandingLayoutItem}
  />
);

export default FeaturesList;
