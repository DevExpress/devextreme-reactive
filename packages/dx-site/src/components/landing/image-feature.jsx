import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './image-feature.module.scss';

const ImageFeature = ({
  imageLink, iconLink,
  title, description,
}) => (
  <div className={`col-lg-6 col-md-6 ${styles.container}`}>
    <div className="row">
      {iconLink && (
        <div className="col-md-2">
          <img
            className={styles.icon}
            alt="title"
            src={iconLink}
          />
        </div>
      )}
      <div className={`${iconLink ? 'col-md-10' : 'col-md-12'}`}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        {imageLink && (
          <img
            className={styles.image}
            alt="title"
            src={imageLink}
          />
        )}
      </div>
    </div>
  </div>
);

ImageFeature.propTypes = {
  imageLink: PropTypes.string,
  iconLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ImageFeature.defaultProps = {
  imageLink: undefined,
  iconLink: undefined,
};

export default ImageFeature;
