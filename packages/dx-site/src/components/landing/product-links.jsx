import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';

import styles from './product-links.module.scss';

export default ({ productInfo }) => (
  productInfo.map(({ title, location }) => (
    <Link
      // partiallyActive
      activeClassName={styles.active}
      to={location}
    >
      {title}
    </Link>
  ))
);
