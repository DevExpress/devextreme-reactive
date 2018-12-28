import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './content-wrapper.module.scss';

const ContentWrapper = ({ children }) => (
  <div className={`${styles.contentWrapper}`}>
    {children}
  </div>
);

ContentWrapper.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ContentWrapper;
