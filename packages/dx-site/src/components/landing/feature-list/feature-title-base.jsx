import * as React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import styles from './feature-title-base.module.scss';

const FeatureTitleBase = ({ guideLink, className, ...restProps }) => (
  guideLink ? (
    <GatsbyLink
      to={guideLink}
      className={`${className} ${styles.titleWithLink}`}
      {...restProps}
    />
  ) : (
    <strong className={className} {...restProps} />
  )
);

FeatureTitleBase.propTypes = {
  guideLink: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FeatureTitleBase.defaultProps = {
  className: undefined,
};

export default FeatureTitleBase;
