import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './link.module.scss';

const Link = ({
  children, type, to, variant, title, fixedWidth, condensed,
}) => (
  <GatsbyLink
    className={`${styles.link} ${type ? styles[type] : ''}
      ${styles[variant]}
      ${fixedWidth ? styles.fixedWidth : ''}
      ${condensed ? styles.condensed : ''}`
    }
    to={to}
    {...title ? { title } : null}
  >
    {children}
  </GatsbyLink>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['button', 'plain']),
  title: PropTypes.string,
};

Link.defaultProps = {
  type: undefined,
  title: undefined,
  variant: 'plain',
};

export default Link;
