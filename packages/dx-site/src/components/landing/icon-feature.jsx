import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './icon-feature.module.scss';

const IconFeature = ({ iconLink, title, description }) => (
  <div className={`col-md-3 ${styles.container}`}>
    {iconLink ? (
      <img
        className={styles.icon}
        alt="title"
        src={iconLink}
      />
    ) : null}
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </div>
);

IconFeature.propTypes = {
  iconLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

IconFeature.defaultProps = {
  iconLink: undefined,
};

export default IconFeature;
