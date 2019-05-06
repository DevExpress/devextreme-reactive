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
}) => (
  <LayoutItemContainer colSize={3}>
    <div className={styles.smallChild}>
      <LandingFeaturePreview
        title={title}
        imageLink={imageLink}
      />
    </div>
    <div className={styles.smallChild}>
      <LandingFeatureDescription
        title={title}
        description={description}
      />
    </div>
  </LayoutItemContainer>
);

export default SmallLayoutItem;
