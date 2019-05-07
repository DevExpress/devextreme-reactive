import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './feature-preview.module.scss';

const FeaturePreview = ({ imageLink, title }) => (
  <img alt={title} src={imageLink} className={styles.image} />
);

FeaturePreview.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string,
};

FeaturePreview.defaultProps = {
  title: undefined,
};

export default FeaturePreview;
