import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './link.module.scss';

const Link = ({ children, type, to }) => (
  <GatsbyLink className={`${styles.link} ${type ? styles[type] : ''}`} to={to}>{children}</GatsbyLink>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  type: undefined,
};

export default Link;
