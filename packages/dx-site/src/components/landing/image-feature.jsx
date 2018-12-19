import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './image-feature.module.scss';

const ImageFeature = ({ imageLink, title, description }) => (
  <div className={`col-md-6 ${styles.container}`}>
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
);

ImageFeature.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageFeature;
