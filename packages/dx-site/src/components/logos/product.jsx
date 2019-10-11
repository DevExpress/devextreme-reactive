import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const titles = {
  react: '',
  'react/core': 'Core',
  'react/grid': 'Grid',
  'react/chart': 'Chart',
  'react/scheduler': 'Scheduler',
};

const RootLink = ({ children }) => (
  <Link to="/" className={`${styles.product}`}>
    {children}
  </Link>
);

const ProductBreadcrumbs = ({ link }) => (
  link !== 'react' ? (
    <>
      <span className={styles.prefix}>/ React /</span>
      <span className={styles.main}>{titles[link]}</span>
    </>
  ) : null
);

const Product = ({ link }) => (
  <>
    <div>
      <RootLink>
        <span className={styles.title}>
          DevExtreme
        </span>
      </RootLink>
      <ProductBreadcrumbs link={link} />
    </div>
    <RootLink>
      <span className={styles.name}>
        Reactive
      </span>
    </RootLink>
  </>
);

Product.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Product;
