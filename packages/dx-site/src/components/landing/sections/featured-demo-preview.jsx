import * as React from 'react';
import PropTypes from 'prop-types';
import FeaturePreview from '../feature-list/feature-preview';
import ShadowContainer from './shadow-container';

import styles from './featured-demo-preview.module.scss';

const FeaturedDemoPreview = ({ title, image, path }) => (
  <ShadowContainer path={path} variant="colored" className={styles.container}>
    <FeaturePreview
      className={styles.image}
      imageLink={image}
      title={title}
      size="dense"
    />
    <span className={styles.title}>
      {title}
    </span>
  </ShadowContainer>
);

FeaturedDemoPreview.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FeaturedDemoPreview;
