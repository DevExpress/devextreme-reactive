import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './link.module.scss';

const Link = ({ children, to }) => (
  <GatsbyLink className={styles.link} to={to}>{children}</GatsbyLink>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
