import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Header = ({ siteTitle }) => (
  <Link
    to="/"
  >
    {siteTitle}
  </Link>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
