import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from './link';

export default ({ productInfo }) => (
  productInfo.map(({ title, location }) => (
    <Link
      to={location}
      title={title}
      variant="plain"
    >
      {title}
    </Link>
  ))
);
