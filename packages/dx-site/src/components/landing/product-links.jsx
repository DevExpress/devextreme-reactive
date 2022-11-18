import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './product-links.module.scss';

const ProductLinks = ({ productInfo }) => (
  productInfo.map(({ title, location }) => (
    <Link
      key={title}
      partiallyActive
      activeClassName={styles.active}
      to={location}
    >
      {title}
    </Link>
  ))
);

ProductLinks.propsTypes = {
  productInfo: PropTypes.object,
};

ProductLinks.defaultProps = {
  productInfo: [
    { title: 'Demos', location: '/demos/' },
    { title: 'Docs', location: '/docs/' },
  ],
};

export default ProductLinks;
