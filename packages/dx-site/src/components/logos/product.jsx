import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const titles = {
  react: 'React Components',
  'react/core': 'React Core',
  'react/grid': 'React Grid',
  'react/chart': 'React Chart',
};

const Product = ({ link }) => (
  <div className="d-flex flex-row align-items-center">
    <div className="d-flex flex-column">
      <Link to="/" className={`${styles.product} ${styles[link.split('/')[0]]}`}>
        {titles[link]}
      </Link>
      <Link to="/" className={styles.main}>
        <span className={styles.title}>
          DevExtreme
        </span>
        {' '}
        <span className={styles.name}>
          Reactive
        </span>
      </Link>
    </div>
  </div>
);

Product.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Product;
