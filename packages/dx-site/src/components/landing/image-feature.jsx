import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './image-feature.module.scss';

const ImageFeature = ({
  iconLink, imageLink,
  title, description,
}) => (
  <div className="col-lg-6 col-md-6 col-sm-6">
    <div className={styles.container}>
      <div className="d-flex align-items-start">
        {iconLink && (
          <img
            className={styles.icon}
            alt="title"
            src={iconLink}
          />
        )}
        <div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.description}>
            {description}
          </div>
        </div>
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
);

ImageFeature.propTypes = {
  iconLink: PropTypes.string,
  imageLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ImageFeature.defaultProps = {
  iconLink: undefined,
  imageLink: undefined,
};

export default ImageFeature;
