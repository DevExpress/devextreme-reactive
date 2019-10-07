import * as React from 'react';
import * as PropTypes from 'prop-types';
import SectionBase from './menu-section';

import styles from './demos-menu-section.module.scss';

const DemosSection = ({ section }) => (
  <SectionBase {...section} classes={{ title: styles.title }} />
);

export default DemosSection;
