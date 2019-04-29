import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingFeatureDescription from './feature-description';
import LandingFeaturePreview from './feature-preview';
import LandingChessBoardLayout from './chess-board-layout';

import styles from './layout-item.module.scss';

const LayoutItem = ({
  title,
  description,
  imageLink,
  colSize,
}) => (
  <div className={`col-md-${colSize} col-sm-${colSize}`}>
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
  </div>
);

export default LayoutItem;
