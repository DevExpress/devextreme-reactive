import * as React from 'react';

import styles from './product-float-image.module.scss';

const ProductFloatImage = ({ imageLink }) => (
<div className={`col-md-6 col-sm-6 ${styles.container} d-none d-sm-block`}>
  <img
    alt="Product Overview"
    src={imageLink}
  />
</div>
);

export default ProductFloatImage;
