import * as React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './feature-preview.module.scss';

const FeaturePreview = ({
  imageLink, guideLink, title, size, className,
}) => {
  const image = (
    <img
      alt={title}
      src={imageLink}
      className={`${styles.image} ${styles[size]} ${className}`}
    />
  );
  return guideLink ? (
    <GatsbyLink to={guideLink}>
      {image}
    </GatsbyLink>
  ) : image;
};

FeaturePreview.propTypes = {
  imageLink: PropTypes.string.isRequired,
  guideLink: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

FeaturePreview.defaultProps = {
  guideLink: undefined,
  title: undefined,
  size: 'normal',
  className: undefined,
};

export default FeaturePreview;
