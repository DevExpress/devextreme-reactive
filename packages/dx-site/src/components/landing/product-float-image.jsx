import * as React from 'react';

import styles from './product-float-image.module.scss';

const ProductFloatImage = ({ imageLink, absolute }) => (
<div className={
  `${absolute ? styles.absoluteContainer : 'col-md-6 col-sm-5'}`
  + ` ${styles.container} d-none d-sm-block`
  }
>
  <div className={styles.relativeWrapper}>
    <img
      className={styles.image}
      alt="Product Overview"
      src={imageLink}
    />
  </div>
</div>
);

export default ProductFloatImage;
