import * as React from 'react';
import PropTypes from 'prop-types';
import SectionBase from './menu-section';

import styles from './menu-sub-section.module.scss';

const NestedTitle = ({ title, ...restProps }) => (
  <h6 {...restProps}>
    {title}
  </h6>
);

NestedTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const SubSection = props => (
  <SectionBase
    {...props}
    titleComponent={NestedTitle}
    listClassName={styles.list}
    titleClassName={styles.title}
  />
);

export default SubSection;
