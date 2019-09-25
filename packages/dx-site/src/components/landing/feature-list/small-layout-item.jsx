import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingFeatureDescription from './small-feature-description';
import LandingFeaturePreview from './feature-preview';
import LayoutItemContainer from './layout-item-container';

import styles from './small-layout-item.module.scss';

const SmallLayoutItem = ({
  title,
  description,
  imageLink,
  guideLink,
}) => (
  <LayoutItemContainer md={3} sm={6} xs={6} className={styles.smallLayoutItem}>
    <div className={styles.smallChild}>
      <LandingFeaturePreview
        title={title}
        imageLink={imageLink}
        guideLink={guideLink}
      />
    </div>
    <div className={styles.smallChild}>
      <LandingFeatureDescription
        title={title}
        description={description}
        guideLink={guideLink}
      />
    </div>
  </LayoutItemContainer>
);

export default SmallLayoutItem;
