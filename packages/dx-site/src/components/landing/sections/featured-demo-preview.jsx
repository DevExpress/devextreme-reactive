import * as React from 'react';
import GatsbyLink from 'gatsby-link';
import FeaturePreview from '../feature-list/feature-preview';
import ShadowContainer from './shadow-container';

import styles from './featured-demo-preview.module.scss';

export default ({ title, image, path }) => (
  <ShadowContainer path={path} variant="no-padding">
    <FeaturePreview
      imageLink={image}
      title={title}
      size="dense"
    />
    <span className={styles.title}>
      {title}
    </span>
  </ShadowContainer>
);
