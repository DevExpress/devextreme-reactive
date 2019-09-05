import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './feature-preview.module.scss';

const FeaturePreview = ({ imageLink, title, size }) => (
  <img alt={title} src={imageLink} className={`${styles.image} ${styles[size]}`} />
);

FeaturePreview.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
};

FeaturePreview.defaultProps = {
  title: undefined,
  size: 'normal',
};

export default FeaturePreview;
