import * as React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './link.module.scss';

const Link = ({
  children, type, to, variant, title, fixedWidth, condensed, ...restProps
}) => (
  <GatsbyLink
    className={`${styles.link} ${type ? styles[type] : ''}
      ${styles[variant]}
      ${fixedWidth ? styles.fixedWidth : ''}
      ${condensed ? styles.condensed : ''}`}
    to={to}
    {...title ? { title } : null}
    {...restProps}
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
  fixedWidth: PropTypes.bool,
  condensed: PropTypes.bool,
};

Link.defaultProps = {
  type: undefined,
  title: undefined,
  variant: 'plain',
  fixedWidth: false,
  condensed: false,
};

export default Link;
