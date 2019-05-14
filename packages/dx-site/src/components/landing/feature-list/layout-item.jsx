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
  md,
}) => (
  <LayoutItemContainer md={md} className={`${styles.layoutItem} d-flex flex-column justify-content-between`}>
    <div className={styles.child}>
      <LandingFeatureDescription
        title={title}
        description={description}
      />
    </div>
    <div className={`${styles.child} mx-sm-auto ${styles.imageContainer}`}>
      <LandingFeaturePreview
        title={title}
        imageLink={imageLink}
      />
    </div>
  </LayoutItemContainer>
);

export default LayoutItem;
