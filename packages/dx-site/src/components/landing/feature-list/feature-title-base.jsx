import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

export default ({ guideLink, ...restProps}) => (
  <GatsbyLink
    to={guideLink}
    {...restProps}
  />
);
