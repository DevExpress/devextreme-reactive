import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingFeatureDescription from './feature-description';
import LandingFeaturePreview from './feature-preview';
import LayoutItemContainer from './layout-item-container';

import styles from './layout-item.module.scss';

const LayoutItem = ({
  title,
  description,
  imageLink,
}) => (
  <LayoutItemContainer md={6} className={styles.layoutItem}>
    <div className={styles.child}>
      <LandingFeatureDescription
        title={title}
        description={description}
      />
    </div>
    <div className={styles.child}>
      <LandingFeaturePreview
        title={title}
        imageLink={imageLink}
      />
    </div>
  </LayoutItemContainer>
);

export default LayoutItem;
