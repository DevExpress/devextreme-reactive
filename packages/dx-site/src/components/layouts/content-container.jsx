import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './content-container.module.scss';

const ContentContainer = ({ children }) => (
  <div className={styles.contentContainer}>
    <div className="container">
      {children}
    </div>
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentContainer;
