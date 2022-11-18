import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './icon-feature.module.scss';

const IconFeature = ({ title, description }) => (
  <div className={`${styles.container} col-md-3 col-sm-6`}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </div>
);

IconFeature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default IconFeature;
