import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const Product = () => (
  <Link to="/" className={styles.product}>
    <span className={styles.title}>
      DevExtreme Reactive
    </span>
  </Link>
);

export default Product;
