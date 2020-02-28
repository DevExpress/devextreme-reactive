import * as React from 'react';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const Product = () => (
  <Link to="/" className={styles.product}>
    <span className={styles.title}>
      DevExtreme
    </span>
    <span className={styles.name}>
      Reactive
    </span>
  </Link>
);

export default Product;
