import * as React from 'react';
import * as PropTypes from 'prop-types';
import SectionBase from './menu-section';

import styles from './demos-menu-section.module.scss';

const DemosSection = ({ section, ...restProps }) => (
  <SectionBase
    {...restProps}
    {...section}
    classes={{ title: styles.title }}
    subSectionComponent={DemosSection}
  />
);

export default DemosSection;
