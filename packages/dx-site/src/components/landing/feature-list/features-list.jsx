import * as React from 'react';
import PropTypes from 'prop-types';
import FeaturesListBase from './features-list-base';
import LandingLayoutItem from './layout-item';
import LandingLayoutRow from './layout-row';

const FeaturesList = props => (
  <FeaturesListBase
    {...props}
    layoutRowComponent={LandingLayoutRow}
    layoutItemComponent={LandingLayoutItem}
  />
);

FeaturesList.propTypes = {
  columns: PropTypes.number,
};

FeaturesList.defaultProps = {
  columns: 2,
};

export default FeaturesList;
