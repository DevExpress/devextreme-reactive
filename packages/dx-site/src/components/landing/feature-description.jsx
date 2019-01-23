import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './feature-description.module.scss';

const FeatureDescription = ({ title, description }) => (
  <div>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </div>
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
