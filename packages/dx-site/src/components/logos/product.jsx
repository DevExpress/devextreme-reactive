import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

import reactLink from './images/react.png';
import reactCoreLink from './images/react-core.png';
import reactGridLink from './images/react-grid.png';
import reactChartLink from './images/react-chart.png';

const iconLinks = {
  react: reactLink,
  'react/core': reactCoreLink,
  'react/grid': reactGridLink,
  'react/chart': reactChartLink,
};

const titles = {
  react: 'React',
  'react/core': 'React Core',
  'react/grid': 'React Grid',
  'react/chart': 'React Chart',
};

const Product = ({ link }) => (
  <div className="d-flex flex-row align-items-center">
    <img
      className={styles.icon}
      alt={titles[link]}
      src={iconLinks[link]}
    />
    <div className="d-flex flex-column">
      <Link to={`/${link}/`} className={`${styles.product} ${styles[link.split('/')[0]]}`}>
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
