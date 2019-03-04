import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const titles = {
  react: 'React Components',
  'react/core': 'React Core',
  'react/grid': 'React Grid',
  'react/chart': 'React Chart',
  'react/scheduler': 'React Scheduler',
};

const Product = ({ link }) => (
  <Link to="/" className={`${styles.product} ${styles[link.split('/')[0]]}`}>
    <span className={styles.main}>
      {titles[link]}
    </span>

    <span className={styles.title}>
      DevExtreme
    </span>
    {' '}
    <span className={styles.name}>
      Reactive
    </span>
  </Link>
);

Product.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Product;
