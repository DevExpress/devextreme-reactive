import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingFeatureDescription from './feature-description';
import LandingFeaturePreview from './feature-preview';
import LayoutItemContainer from './layout-item-container';

import styles from './layout-item.module.scss';

const LayoutItem = ({
  title,
  description,
  guideLink,
  imageLink,
  md,
}) => (
  <LayoutItemContainer md={md} className={`${styles.layoutItem} d-flex flex-column justify-content-between`}>
    <div className={styles.child}>
      <LandingFeatureDescription
        title={title}
        guideLink={guideLink}
        description={description}
      />
    </div>
    <div className={`${styles.child} mx-sm-auto ${styles.imageContainer}`}>
      <LandingFeaturePreview
        title={title}
        guideLink={guideLink}
        imageLink={imageLink}
        size={md < 6 ? 'dense' : 'normal'}
      />
    </div>
  </LayoutItemContainer>
);

export default LayoutItem;
