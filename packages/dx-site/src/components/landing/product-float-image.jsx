import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './product-float-image.module.scss';

const ProductFloatImage = ({ imageLink, isIndexPage }) => (
  <div className={styles.container}>
    <div className="col-md-6 col-sm-5 d-none d-sm-block">
      <div className={styles.relativeWrapper}>
        <img
          className={`${styles.image} ${isIndexPage ? styles.indexImage : ''} `}
          alt="Product Overview"
          src={imageLink}
        />
      </div>
    </div>
  </div>
);

ProductFloatImage.propTypes = {
  imageLink: PropTypes.string.isRequired,
  isIndexPage: PropTypes.bool.isRequired,
};

export default ProductFloatImage;
