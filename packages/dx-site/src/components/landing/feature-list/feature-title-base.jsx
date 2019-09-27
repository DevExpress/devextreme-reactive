import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import styles from './feature-title-base.module.scss';

export default ({ guideLink, className, ...restProps}) => (
  guideLink ? (
    <GatsbyLink
      to={guideLink}
      className={`${className} ${styles.titleWithLink}`}
      {...restProps}
    />
  ) : (
    <div className={className} {...restProps} />
  )
);
