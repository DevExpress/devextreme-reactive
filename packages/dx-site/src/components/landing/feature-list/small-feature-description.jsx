import * as React from 'react';
import * as PropTypes from 'prop-types';
import FeatureDescriptionBase from './feature-description-base';

import styles from './small-feature-description.module.scss';

const Title = props => <div {...props} className={styles.smallTitle} />;
const Description = props => <div {...props} className={styles.smallDescription} />;

const FeatureDescription = props => (
  <FeatureDescriptionBase
    titleComponent={Title}
    descriptionComponent={Description}
    {...props}
  />
);

FeatureDescription.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

FeatureDescription.defaultProps = {
  description: undefined,
  title: undefined,
};

export default FeatureDescription;
