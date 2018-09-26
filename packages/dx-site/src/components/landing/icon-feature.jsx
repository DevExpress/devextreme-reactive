import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './icon-feature.module.scss';

const IconFeature = ({ iconLink, title, description }) => (
  <div className={`col-md-3 ${styles.container}`}>
    <div className="row">
      {iconLink ? (
        <div className="col-2 col-md-12">
          <img
            className={styles.icon}
            alt="title"
            src={iconLink}
          />
        </div>
      ) : null}
      <div className={`${iconLink ? 'col-10' : 'col-12'} col-md-12`}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
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
